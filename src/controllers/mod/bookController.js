const Book = require("../../models/Book");

const bookController = {
  renderCreateBook: (req, res) => {
    res.render("books/create", {
      title: "Добавить книгу",
      books: {},
    });
  },

  createBook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      await newBook.save();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/create");
    }
  },

  renderUpdateBook: async (req, res) => {
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
  },

  updateBook: async (req, res) => {
    try {
      const id = req.params.id;

      const book = await Book.findByIdAndUpdate(id, req.body);

      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect("/");
    }
  },

  getBookPage: async (req, res) => {
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
  },

  deleteBook: async (req, res) => {
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
  },
};

module.exports = bookController;
