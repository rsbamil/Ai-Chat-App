const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const redisClient = require("../services/redis.service");
const createUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    const token = await user.generateJWT();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ errors: "invalid credentials" });
    }
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        errors: "invalid credentials",
      });
    }
    const token = await user.generateJWT();
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const profileController = async (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};

const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await redisClient.set(token, "logout", "EX", 60 * 60 * 24);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
module.exports = {
  createUserController,
  loginController,
  profileController,
  logoutController,
};
