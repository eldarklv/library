const express = require("express");
const userController = require("../../controllers/mod/userController");

const router = express.Router();

router.get("/create", userController.renderCreateBook);

router.post("/create", userController.createBook);

router.get("/update/:id", userController.renderUpdateBook);

router.post("/update/:id", userController.updateBook);

router.get("/:id", userController.getBookPage);

router.post("/delete/:id", userController.deleteBook);

module.exports = router;
