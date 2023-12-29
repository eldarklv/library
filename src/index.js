const express = require("express");
require("dotenv").config();
const error404 = require("./middleware/404");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const userRouter = require("./routes/mod/user");
const booksRouter = require("./routes/api/books");
const modBooksRouter = require("./routes/mod/books");
const indexRouter = require("./routes/index");

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;

const app = express();

app.use(express.urlencoded({ extended: true })); // extended: true чтобы не было варнинга body-parser deprecated
app.use(express.json());
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("database/fileBooks"));
app.use("/", indexRouter);
app.use("/mod/user", userRouter);
app.use("/api/books", booksRouter);
app.use("/mod/books", modBooksRouter);
app.use(error404);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

require("./config/passport");

mongoose.connect(mongo_url).then(() => console.log("Mongo connected!"));
app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
