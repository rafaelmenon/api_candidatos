const mongoose = require("mongoose");
const Users = mongoose.model("User");

exports.getUsers = async () => {
  const response = await Users.find({}, "-password");
  return response;
};

exports.getUser = async (id) => {
  const response = await Users.findOne({ _id: id }, "-password");
  return response;
};

exports.createUser = async (data) => {
  const user = new Users(data);
  await user.save();
};

exports.updateUser = async (id, data) => {
  await Users.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.deleteUSer = async (id) => {
  await Users.findByIdAndDelete(id);
};
