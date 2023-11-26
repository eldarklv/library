const Book = require("../models/Book");
const { v4: uuidv4 } = require("uuid");

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
