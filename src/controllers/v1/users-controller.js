const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../mongo/models/users");
const Products = require("../../mongo/models/products");
const expiresIn = 60 * 10;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: "OK", data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: "INVALID_PASSWORD", message: "" });
      }
    } else {
      res.status(401).send({ status: "USER_NOT_FOUND", message: "" });
    }
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const { userName, email, password, data } = req.body;

    const hash = await bcrypt.hash(password, 15);

    await Users.create({
      userName,
      email,
      data,
      password: hash,
    });

    res.send({ status: "OK", message: "user created" });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: "DUPLICATED_VALUES", message: error.keyValue });
      return;
    }
    console.log("create user:", error);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw new Error("missing param userId");
    }

    await Users.findByIdAndDelete(userId);

    await Products.deleteMany({ user: userId });

    res.send({ status: "OK", message: "user deleted" });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find().select({ password: 0, __v: 0 });
    res.send({ status: "OK", data: users });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("req.sessionData", req.sessionData.userId);
    const { userName, email, data } = req.body;
    await Users.findByIdAndUpdate(req.sessionData.userIdF, {
      userName,
      email,
      data,
    });
    res.send({ status: "OK", message: "user updated" });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res
        .status(400)
        .send({ status: "DUPLICATED_VALUES", message: error.keyValue });
      return;
    }
    res.status(500).send({ status: "ERROR", message: "user not updated" });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  login,
};
