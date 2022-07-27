import User from "../models/User.js";
import { createTokenUser, attachCookiesToResponse } from "../utils/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new Error("Email already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  const tokenUser = createTokenUser(user);
  console.log(tokenUser);
  attachCookiesToResponse({ res, user: tokenUser });
  res.status(200).json({ user: tokenUser });
};
const login = async (req, res) => {
  res.status(200).json({
    msg: "login page",
  });
};
const logout = async (req, res) => {
  res.status(200).json({
    msg: "logout page",
  });
};

export { register, login, logout };
