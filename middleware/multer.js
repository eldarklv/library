const multer = require("multer");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "database/fileBooks");
  },
  filename(req, file, cb) {
    // имя файла книги == id книги
    cb(null, `${req.params.id}`);
  },
});

module.exports = multer({ storage });
