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
//DATABASE
import connectDatabase from "./connectDB/connect.js";
//  ROUTERS
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// MIDDLEWARE
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

// ---
app.get("/", (req, res) => {
  res.send("auth-workflow");
});
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan("tiny"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

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
