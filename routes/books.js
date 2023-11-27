const express = require("express");
const { library } = require("../database/collections");
const Book = require("../models/Book");

const router = express.Router();

router.get("/", (req, res) => {
  const books = library;
  res.status(200);
  res.json(books);
});

router.get("/:id", (req, res) => {
  const books = library;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

router.post("/", (req, res) => {
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
  res.status(201);
  res.json(newBook);
});

router.put("/:id", (req, res) => {
  const books = library;

  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  // редактирование найденной книги с помощью rest оператора
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      ...req.body,
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

router.delete("/:id", (req, res) => {
  const books = library;

  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (id !== -1) {
    books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

module.exports = router;
