const multer = require("multer");
const path = require("path");

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

module.exports = multer({ storage });
