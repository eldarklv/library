const express = require("express");
const { library } = require("../../database/collections");
const Book = require("../../models/Book");
const multer = require("../../middleware/multer");
const fs = require("fs");

const router = express.Router();

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу",
    books: {},
  });
});

router.post("/create", (req, res) => {
  const books = library;

  const newBook = new Book(
    req.body.title,
    req.body.description,
    req.body.authors,
    req.body.favorite,
    req.body.fileCover,
    req.body.fileName
  );
  books.push(newBook);
  res.redirect("/");
});

router.get("/update/:id", (req, res) => {
  const books = library;
  const id = req.params.id;
  const idx = books.findIndex((el) => el.id === id);

  res.render("books/update", {
    title: "Редактировать книгу",
    book: books[idx],
  });
});

router.post("/update/:id", (req, res) => {
  const books = library;
  const id = req.params.id;
  const idx = books.findIndex((el) => el.id === id);

  books[idx] = {
    ...books[idx],
    ...req.body,
  };
  res.redirect("/");
});

router.get("/:id", (req, res) => {
  const books = library;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    res.render("books/view", {
      title: "О книге",
      book: books[idx],
    });
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

router.post("/delete/:id", (req, res) => {
  const books = library;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.redirect("/");
  }
});

module.exports = router;
