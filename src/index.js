const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user");
const booksRouter = require("./routes/books");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL

const app = express();

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/books", booksRouter);
app.use(express.static("database/fileBooks"));

mongoose.connect(mongo_url).then(() => console.log("Mongo connected!"));
app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
