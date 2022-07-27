// DOTENV
import dotenv from "dotenv";
dotenv.config();
// EXPRESS ASYNC ERRORS
import "express-async-errors";
// EXPRESS
import express from "express";
const app = express();

//DATABASE
import connectDatabase from "./connectDB/connect.js";
//  ROUTERS
app.get("/", (req, res) => {
  res.send("auth-workflow");
});
// MIDDLEWARE
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

// ---

app.use(express.json());

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
