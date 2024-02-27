import express from "express"
import bookController from "../../controllers/mod/bookController";
import ensureAuthenticated from "../../middleware/ensureAuthenticated";

const router = express.Router();

router.get("/create", ensureAuthenticated, bookController.renderCreateBook);

router.post("/create", ensureAuthenticated, bookController.createBook);

router.get("/update/:id", ensureAuthenticated, bookController.renderUpdateBook);

router.post("/update/:id", ensureAuthenticated, bookController.updateBook);

router.get("/:id", ensureAuthenticated, bookController.getBookPage);

router.post("/delete/:id", ensureAuthenticated, bookController.deleteBook);

module.exports = router;
