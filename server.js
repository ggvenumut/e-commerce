// DOTENV
import dotenv from "dotenv";
dotenv.config();
// EXPRESS ASYNC ERRORS
import "express-async-errors";
// EXPRESS
import express from "express";
const app = express();
// REST OF THE PACKAGES
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";

//DATABASE
import connectDatabase from "./connectDB/connect.js";
//  ROUTERS
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// MIDDLEWARE
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("tiny"));
app.use(express.static("./public"));
app.use(fileUpload());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/order", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 9000;
async function start() {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`listening on ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

start();
