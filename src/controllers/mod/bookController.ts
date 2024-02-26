import { Book } from "../../models/Book";
import { Request, Response } from "express";

class bookController {
  renderCreateBook(req: Request, res: Response) {
    res.render("books/create", {
      title: "Добавить книгу",
      books: {},
    });
  };

  async createBook(req: Request, res: Response) {
    try {
      const newBook = new Book(req.body);
      await newBook.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/create");
    }
  };

  async renderUpdateBook(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const book = await Book.findById(id);

      if (book) {
        res.render("books/update", {
          title: "Редактировать книгу",
          book: book,
        });
      } else {
        res.redirect("/404");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  };

  async updateBook(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const book = await Book.findByIdAndUpdate(id, req.body);

      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  };

  async getBookPage(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const book = await Book.findById(id);

      if (book) {
        res.render("books/view", {
          title: "О книге",
          book: book,
        });
      } else {
        res.redirect("/404");
      }
    } catch (error) {
      console.log(error);
      res.redirect("");
    }
  };

  async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const book = await Book.findByIdAndDelete(id);

      if (book) {
        res.redirect("/");
      } else {
        res.redirect("/404");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  };
};

module.exports = new bookController();
