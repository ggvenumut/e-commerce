const getAllUsers = async (req, res) => {
  res.status(200).json({ message: "get all users" });
};

const getSingleUser = async (req, res) => {
  res.status(200).json({ message: "get Single User" });
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
