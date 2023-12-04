const express = require("express");
require("dotenv").config();
const Book = require("./models/Book");
const { library } = require("./database/collections");

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
});

app.get("/api/books", (req, res) => {
  const books = library;
  res.status(200);
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
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

app.post("/api/books", (req, res) => {
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

app.put("/api/books/:id", (req, res) => {
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

app.delete("/api/books/:id", (req, res) => {
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

app.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
