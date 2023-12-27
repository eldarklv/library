const express = require("express");
const Book = require("../../models/Book");

const router = express.Router();

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Добавить книгу",
    books: {},
  });
});

router.post("/create", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/create");
  }
});

router.get("/update/:id", async (req, res) => {
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
});

router.post("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const book = await Book.findByIdAndUpdate(id, req.body);

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:id", async (req, res) => {
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
});

router.post("/delete/:id", async (req, res) => {
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
});

module.exports = router;
