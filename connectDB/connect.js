import mongoose from "mongoose";

const connectDatabase = (url) => {
  return mongoose
    .connect(url)
    .then(() => console.log("connectDatabase"))
    .catch((err) => console.log(err));
};

export default connectDatabase;
