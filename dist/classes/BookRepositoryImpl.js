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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRepositoryImpl = void 0;
const BookRepository_1 = require("./BookRepository");
const Book_1 = require("../models/Book");
class BookRepositoryImpl extends BookRepository_1.BookRepository {
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = new Book_1.Book(book);
                yield newBook.save();
                return newBook;
            }
            catch (err) {
                console.log('Ошибка создания книги', err);
                return null;
            }
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = Book_1.Book.findById(id);
                return book;
            }
            catch (err) {
                console.log('Ошибка при попытке получить книгу');
                return null;
            }
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    updateBook(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.BookRepositoryImpl = BookRepositoryImpl;
