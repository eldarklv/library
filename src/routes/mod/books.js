const express = require("express");
const bookController = require("../../controllers/mod/bookController");
const ensureAuthenticated = require("../../middleware/ensureAuthenticated");

const router = express.Router();

router.get("/create", ensureAuthenticated, bookController.renderCreateBook);

router.post("/create", ensureAuthenticated, bookController.createBook);

router.get("/update/:id", ensureAuthenticated, bookController.renderUpdateBook);

router.post("/update/:id", ensureAuthenticated, bookController.updateBook);

router.get("/:id", ensureAuthenticated, bookController.getBookPage);

router.post("/delete/:id", ensureAuthenticated, bookController.deleteBook);

module.exports = router;
