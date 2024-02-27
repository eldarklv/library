import mongoose from "mongoose";
import { IBook } from "../interfaces/IBook";

const BookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  authors: { type: String, required: true },
  favorite: { type: String },
  fileCover: { type: String },
  fileName: { type: String },
  fileBook: { type: String },
});

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;
