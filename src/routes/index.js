const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", {
    title: "Библиотека",
    books: books,
  });
});

module.exports = router;
