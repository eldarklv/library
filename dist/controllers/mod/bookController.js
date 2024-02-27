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
const bookController = {
    renderCreateBook: (req, res) => {
        res.render("books/create", {
            title: "Добавить книгу",
            books: {},
        });
    },
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newBook = new Book(req.body);
            yield newBook.save();
            res.redirect("/");
        }
        catch (error) {
            console.log(error);
            res.redirect("/create");
        }
    }),
    renderUpdateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const book = yield Book.findById(id);
            if (book) {
                res.render("books/update", {
                    title: "Редактировать книгу",
                    book: book,
                });
            }
            else {
                res.redirect("/404");
            }
        }
        catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            const book = yield Book.findByIdAndUpdate(id, req.body);
            res.redirect("/");
        }
        catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }),
    getBookPage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findById(id);
            if (book) {
                res.render("books/view", {
                    title: "О книге",
                    book: book,
                });
            }
            else {
                res.redirect("/404");
            }
        }
        catch (error) {
            console.log(error);
            res.redirect("");
        }
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book.findByIdAndDelete(id);
            if (book) {
                res.redirect("/");
            }
            else {
                res.redirect("/404");
            }
        }
        catch (error) {
            console.log(error);
            res.redirect("/");
        }
    }),
};
module.exports = bookController;
