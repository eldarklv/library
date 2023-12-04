const Book = require("../models/Book");

// закинул в базу немного данных
const collections = {
  library: [
    new Book(
      "Durak",
      "Durak book description",
      "Saltikov-Shedrin",
      "yes",
      "paper",
      "some file"
    ),
    new Book(
      "Shinel",
      "Shinel book description",
      "Gogol",
      "yes",
      "paper",
      "some file"
    ),
  ],
};

module.exports = collections;
