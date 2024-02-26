import { Book } from "../../models/Book";
import { container } from "../../config/container";
import { BookRepositoryImpl } from "../../classes/BookRepositoryImpl";
import { IBook } from "../../interfaces/IBook";
import { Request, Response } from "express";
import axios from "axios";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

const counter_url = process.env.COUNTER_URL;

class BookController {
  async getBooks (req: Request, res: Response) {
    const repo = container.get(BookRepositoryImpl);
    const books: IBook[] = await repo.getBooks();
    if (books) {
      res.json(books);
    } else {
      res.json({ message: "Не удалось найти книги" });
    }
  };

  async getBookById (req: Request, res: Response) {
    const repo = container.get(BookRepositoryImpl);

    const { id } = req.params;

    const book = await repo.getBook(id);

    if (!book) {
      res.status(404).json({ error: "Not found" });
    } else {
      const countIncrUrl = counter_url + "/counter" + "/" + id + "/incr";
      const { data } = await axios.post(countIncrUrl);
      res.json({ ...book.toObject(), count: data.count });
    }
  };

  async createBook (req: Request, res: Response) {
    const repo = container.get(BookRepositoryImpl);

    const newBook = await repo.createBook(req.body);

    if (newBook) {
      res.json(newBook);
    } else {
      res.json({ message: "Не удалось создать книгу" });
    }
  };

  async updateBook (req: Request, res: Response) {
    const repo = container.get(BookRepositoryImpl);

    const { id } = req.params;

    const book = await repo.updateBook(id, req.body);

    if (book) {
      res.json(book);
    } else {
      res.json({ message: "Не удалось отредактировать книгу" });
    }
  };

  async deleteBook (req: Request, res: Response) {
    const repo = container.get(BookRepositoryImpl);

    const { id } = req.params;

    const book = await repo.deleteBook(id);

    if (book) {
      res.json(book);
    } else {
      res.json({message: "Не удалось удалить книгу"})
    }
  };

  // метод не из ДЗ по контейнерам
  // req: any потому что req.file без типов
  async uploadFile (req: any, res: Response) {
    try {
      const { id } = req.params;

      const book = await Book.findById(id);

      if (!book) {
        res.status(404).json({ error: "Not found" });
      } else {
        const fileBook = `database/fileBooks/${req.file.filename}`;
        await Book.findByIdAndUpdate(id, {
          ...book.toObject,
          fileBook,
        });
        const updatedBook = await Book.findById(id);
        res.json(updatedBook);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // метод не из ДЗ по контейнерам
  async deleteFile (req: Request, res: Response) {
    try {
      const { id } = req.params;

      const book = await Book.findById(id);

      if (!book) {
        res.status(404).json({ error: "Not found" });
      } else {
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

        await Book.updateOne({ _id: id }, { $unset: { fileBook: 1 } });
        res.json({ success: true });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // метод не из ДЗ по контейнерам
  async downloadFile (req: Request, res: Response) {
    const { id } = req.params;
    const book = await Book.findById(id);

    // Проверка, что такая книга существует
    if (book?.fileBook && book?.fileName) {
      const databaseDirectory = path.join(__dirname, "../../");
      const newFilePath = path.join(databaseDirectory, book.fileBook);

      // Проверка, что существует файл, путь к которому хранит объект книги. Если файла нет вернуть 500, т.к. нарушена консистентность данных
      if (fs.existsSync(newFilePath)) {
        res.download(newFilePath, book.fileName, (error) => {
          if (error) {
            console.log("Ошибка при скачивании файла:", error);
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
  };
};

module.exports = new BookController();
