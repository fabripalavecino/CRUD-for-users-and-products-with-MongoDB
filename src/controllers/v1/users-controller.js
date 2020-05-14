const bcrypt = require("bcryptjs");
const Users = require("../../mongo/models/users"); 

const createUser = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const { username, email, password, data } = req.body;

    const hash = await bcrypt.hash(password, 15);

    /*await Users.create({
      username,
      email,
      data,
      password: hash
    });*/

    const user = new Users();
    user.username = username;
    user.email = email;
    user.data = data;
    user.password = hash;

    await user.save();


    
    res.send({ status: "OK", message: "user created" });
  } catch (error) {
    if(error.code && error.code === 11000){
      res.status(400).send({ status: "DUPLICATED_VALUES", message: error.keyValue });
      return;
    }
    console.log("create user:", error);
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
