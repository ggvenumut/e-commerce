import express from "express";

const app = express();

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
