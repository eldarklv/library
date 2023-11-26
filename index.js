const express = require("express");
require("dotenv").config();
const Book = require("./models/Book");
const { library } = require("./database/collections");

const port = process.env.PORT || 3000;

app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
