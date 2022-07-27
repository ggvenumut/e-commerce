import User from "../models/User.js";
import {
  createTokenUser,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  checkPermissions,
} from "../utils/index.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");

  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new Error(`No user with id : ${req.params.id}`);
  }
  checkPermissions(req.user, user._id);
  res.status(200).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new Error("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userID });
  user.email = email;
  user.name = name;

  await user.save();
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(200).json({ user: tokenUser });
};
const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new Error("Please provide both values");
  }
  const user = await User.findOne({ _id: req.user.userID });
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }

  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "Success! Password Updated." });
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
