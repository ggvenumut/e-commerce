import Review from "../models/Review.js";
import Product from "../models/Product.js";

import { checkPermissions } from "../utils/index.js";

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new Error(`No product with id ${productId}`);
  }
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userID,
  });
  if (alreadySubmitted) {
    throw new Error("Already submitted review for this product");
  }
  req.body.user = req.user.userID;
  const review = await Review.create(req.body);
  res.status(200).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name company price",
  });

  res.status(200).json({ reviews, count: reviews.length });
};
const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new Error(`No review with id ${reviewId}`);
  }
  res.status(200).json({ review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new Error(`No review with id ${reviewId}`);
  }
  checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(200).json({ review });
};
const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new Error(`No review with id ${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  await review.remove();
  res.status(200).json({ msg: "Success! Review removed" });
};
const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.status(200).json({ reviews, count: reviews.length });
};

export {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};
