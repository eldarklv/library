const express = require("express");
import { Book } from "../models/Book";

const router = express.Router();

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", {
    title: "Библиотека",
    books: books,
    user: req.user,
  });
});

module.exports = router;
