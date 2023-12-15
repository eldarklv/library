const express = require("express");
const { library } = require("../database/collections");
const Book = require("../models/Book");
const multer = require("../middleware/multer");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const router = express.Router();
const counter_url = process.env.COUNTER_URL;

router.get("/", (req, res) => {
  const books = library;
  res.status(200);
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const books = library;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    try {
      const countIncrUrl = counter_url + "/counter" + "/" + id + "/incr";
      console.log(countIncrUrl);
      const { data } = await axios.post(countIncrUrl);
      res.json({ ...books[idx], count: data.count });
    } catch (error) {
      res.json({ error: error });
    }
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

router.post("/", multer.single("bookFile"), (req, res) => {
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

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

router.post("/:id/file", multer.single("fileBook"), (req, res) => {
  const books = library;

  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1 && req.file) {
    books[idx].fileBook = `database/fileBooks/${req.file.filename}`;
    res.json(books[idx]);
  } else {
    res.status(400);
    res.json("Что-то пошло не так");
  }
});

router.delete("/:id/file", (req, res) => {
  const books = library;

  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    if (books[idx].fileBook) {
      const filePath = `${books[idx].fileBook}`;

      // удаляется файл по id, если он есть
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.log("Ошибка при удалении файла");
        }
      }
    }

    delete books[idx].fileBook;
    res.json("deleted");
  } else {
    res.status(400);
    res.json("Что-то пошло не так");
  }
});

router.get("/:id/download", (req, res) => {
  const books = library;

  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  // Проверка, что такой id есть в БД книг. Если id нет, то пользователь ошибся. Вернуть 404
  if (idx !== -1) {
    // Получаем текущий путь к файлу, где выполняется скрипт
    const currentFilePath = __filename;

    // Формируем путь к директории routes
    const routesDirectory = path.dirname(currentFilePath);

    // Формируем путь к директории database относительно директории routes
    const databaseDirectory = path.join(routesDirectory, "../");

    // Формируем новый путь к файлу
    const newFilePath = path.join(databaseDirectory, books[idx].fileBook);

    // Проверка, что существует файл, путь к которому хранит объект книги. Если файла нет вернуть 500, т.к. нарушена консистентность данных
    if (fs.existsSync(newFilePath)) {
      res.download(newFilePath, books[idx].fileName, (error) => {
        if (error) {
          console.log("Ошибка при скачивании файла:", err);
          res.status(500).json("Ошибка при скачивании файла");
        }
      });
    } else {
      res.status(500);
      res.json("Файл не удалось найти");
      return;
    }
  } else {
    res.status(404);
    res.json("404 | Книга не найдена");
  }
});

module.exports = router;
