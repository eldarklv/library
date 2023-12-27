const express = require("express");
const bookController = require("../../controllers/mod/bookController");

const router = express.Router();

router.get("/create", bookController.renderCreateBook);

router.post("/create", bookController.createBook);

router.get("/update/:id", bookController.renderUpdateBook);

router.post("/update/:id", bookController.updateBook);

router.get("/:id", bookController.getBookPage);

router.post("/delete/:id", bookController.deleteBook);

module.exports = router;
