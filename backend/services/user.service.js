const { model } = require("mongoose");
const userModel = require("../models/user.model");

const createUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const hashedPassword = await userModel.hashPassword(password);
  const user = await userModel.create({
    email,
    password: hashedPassword,
  });
  return user;
};

module.exports = { createUser };
