const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 15);
    console.log("fin", hash);
    res.send({ status: "OK", message: "user created" });
  } catch (error) {
    res.status(500).send({ status: "ERROR", message: error.message });
  }
};

const deleteUser = (req, res) => {
  res.send({ status: "OK", message: "user deleted" });
};

const getUsers = (req, res) => {
  res.send({ status: "OK", data: [] });
};

const updateUser = (req, res) => {
  res.send({ status: "OK", message: "user updated" });
};

module.exports = {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
};
