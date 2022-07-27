const register = async (req, res) => {
  res.status(200).json({
    msg: "register page",
  });
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
