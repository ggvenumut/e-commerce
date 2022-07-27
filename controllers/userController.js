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
  res.status(200).json({ message: "show Current User" });
};

const updateUser = async (req, res) => {
  res.status(200).json({ message: "update User" });
};
const updateUserPassword = async (req, res) => {
  res.status(200).json({ message: "update User Password" });
};

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
