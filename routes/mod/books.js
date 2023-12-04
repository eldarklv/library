const express = require("express");
const { library } = require("../../database/collections");
const Book = require("../../models/Book");
const multer = require("../../middleware/multer");
const fs = require("fs");

const router = express.Router();

router.get("/:id", (req, res) => {
  const books = library;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    res.render("books/view", {
      book: books[idx],
    });
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

module.exports = router;
