import Product from "../models/Product.js";

const createProduct = async (req, res) => {
  req.body.user = req.user.userID;
  const product = await Product.create(req.body);
  res.status(200).json({ product });
};
const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(200).json({ products, count: products.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new Error(`No product with id : ${productId}`);
  }

  res.status(200).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new Error(`No product with id : ${productId}`);
  }

  res.status(200).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new Error(`No product with id : ${productId}`);
  }

  await product.remove();
  res.status(200).json({ msg: "Success! Product removed." });
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
