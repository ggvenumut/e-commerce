// DOTENV
import dotenv from "dotenv";
dotenv.config();
// EXPRESS
import express from "express";
const app = express();

//DATABASE
import connectDatabase from "./connectDB/connect.js";

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
