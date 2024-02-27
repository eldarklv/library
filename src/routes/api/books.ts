import express from "express";
import multerMidlleware from "../../middleware/multer";
import bookController from "../../controllers/api/bookController"

const router = express.Router();

router.get("/", bookController.getBooks);

router.get("/:id", bookController.getBookById);

router.post("/", bookController.createBook);

router.put("/:id", bookController.updateBook);

router.delete("/:id", bookController.deleteBook);

router.post("/:id/file", multerMidlleware.single("fileBook"), bookController.uploadFile);

router.delete("/:id/file", bookController.deleteFile);

router.get("/:id/download", bookController.downloadFile);

module.exports = router;
