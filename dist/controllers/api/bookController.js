"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Book = require("../../models/Book");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const counter_url = process.env.COUNTER_URL;
const bookController = {
    getBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const books = yield Book.find();
            res.json(books);
        }
        catch (error) {
            res.json({ error: error });
        }
    }),
    getBookById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findById(id);
            if (!book) {
                res.status(404).json({ error: "Not found" });
            }
            else {
                const countIncrUrl = counter_url + "/counter" + "/" + id + "/incr";
                const { data } = yield axios.post(countIncrUrl);
                res.json(Object.assign(Object.assign({}, book.toObject()), { count: data.count }));
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newBook = new Book(req.body);
            yield newBook.save();
            res.json(newBook);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findByIdAndUpdate(id, req.body);
            if (!book) {
                res.status(404).json({ error: "Not found" });
            }
            else {
                const updatedBook = yield Book.findById(id);
                res.json(updatedBook);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findByIdAndDelete(id);
            if (!book) {
                res.status(404).json({ error: "Not found" });
            }
            else {
                res.json(book);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    uploadFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findById(id);
            if (!book) {
                res.status(404).json({ error: "Not found" });
            }
            else {
                const fileBook = `database/fileBooks/${req.file.filename}`;
                yield Book.findByIdAndUpdate(id, Object.assign(Object.assign({}, book.toObject), { fileBook }));
                const updatedBook = yield Book.findById(id);
                res.json(updatedBook);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findById(id);
            if (!book) {
                res.status(404).json({ error: "Not found" });
            }
            else {
                if (book.fileBook) {
                    // Получаем текущий путь к файлу, где выполняется скрипт
                    const currentFilePath = __filename;
                    // Формируем путь к директории routes
                    const routesDirectory = path.dirname(currentFilePath);
                    // Формируем путь к директории database относительно директории routes
                    const databaseDirectory = path.join(routesDirectory, "../");
                    // Формируем новый путь к файлу
                    const newFilePath = path.join(databaseDirectory, book.fileBook);
                    if (fs.existsSync(newFilePath)) {
                        fs.unlinkSync(newFilePath);
                    }
                }
                yield Book.updateOne({ _id: id }, { $unset: { fileBook: 1 } });
                res.json({ success: true });
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    downloadFile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const book = yield Book.findById(id);
        // Проверка, что такая книга существует
        if (book) {
            const databaseDirectory = path.join(__dirname, "../../");
            const newFilePath = path.join(databaseDirectory, book.fileBook);
            // Проверка, что существует файл, путь к которому хранит объект книги. Если файла нет вернуть 500, т.к. нарушена консистентность данных
            if (fs.existsSync(newFilePath)) {
                res.download(newFilePath, book.fileName, (error) => {
                    if (error) {
                        console.log("Ошибка при скачивании файла:", err);
                        res.status(500).json("Ошибка при скачивании файла");
                    }
                });
            }
            else {
                res.status(500);
                res.json("Файл не удалось найти");
                return;
            }
        }
        else {
            res.status(404);
            res.json("404 | Книга не найдена");
        }
    }),
};
module.exports = bookController;
