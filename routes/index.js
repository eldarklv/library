const express = require("express");
const { library } = require("../database/collections");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    books: library,
  });
});

module.exports = router;
