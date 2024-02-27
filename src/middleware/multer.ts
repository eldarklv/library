import multer from "multer";
import path from "path";

const destinationPath = path.join(__dirname, "../database/fileBooks");

const storage = multer.diskStorage({
  destination(req, file, cb) {

    cb(null, destinationPath);
  },
  filename(req, file, cb) {
    // имя файла книги == id книги
    cb(null, `${req.params.id}`);
  },
});

const multerMidlleware = multer({ storage });

export default multerMidlleware;
