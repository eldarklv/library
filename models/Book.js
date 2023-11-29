const { v4: uuidv4 } = require("uuid");

class Book {
  constructor(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
    id = uuidv4()
  ) {
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
    this.id = id;
  }
}

module.exports = Book;
