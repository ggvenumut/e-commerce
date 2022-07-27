import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  res.send("create product");
};
const getAllProducts = async (req, res) => {
  res.send("get All Products");
};
const getSingleProduct = async (req, res) => {
  res.send("getSingleProduct ");
};
const updateProduct = async (req, res) => {
  res.send("updateProduct ");
};
const deleteProduct = async (req, res) => {
  res.send("deleteProduct ");
};
const uploadImage = async (req, res) => {
  res.send("uploadImage ");
};
export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
