const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/api/user");
const apiBooksRouter = require("./routes/api/books");
const modBooksRouter = require("./routes/mod/books");
const indexRouter = require("./routes/index");
const error404 = require("./middleware/404")

const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true })); // extended: true чтобы не было варнинга body-parser deprecated
app.use(express.json());
app.use("/", indexRouter);
app.use("/api/user", userRouter);
app.use("/api/books", apiBooksRouter);
app.use("/mod/books", modBooksRouter);
app.set("view engine", "ejs");
app.use(error404);

app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
