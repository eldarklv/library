import "reflect-metadata"
import { BookRepository } from "./BookRepository";
import { IBook } from "../interfaces/IBook";
import { Book } from "../models/Book";
import { injectable } from "inversify";
import mongoose from "mongoose";

type IBookDoc = IBook & mongoose.Document

@injectable()
export class BookRepositoryImpl extends BookRepository {
  public async createBook(book: IBook): Promise<IBookDoc | null> {
    try {
      const newBook = new Book(book);
      await newBook.save();
      return newBook;
    } catch(err) {
      console.log('Ошибка создания книги', err);
      return null
    }
  }

  public async getBook(id: string): Promise<IBookDoc | null> {
    try {
      const book = Book.findById(id);
      return book;
    } catch(err) {
      console.log('Ошибка при попытке получить книгу')
      return null
    }
  }

  public async getBooks(): Promise<IBookDoc[]> {
    try {
      const books = Book.find({});
      return books
    } catch(err) {
      console.log('Ошибка получения списка книг', err);
      return []
    }
  }

  public async updateBook(id: string, book: IBook): Promise<IBookDoc | null> {
    try {
      const updateBook = await Book.findByIdAndUpdate(id, book, {new: true});
      return updateBook;
    } catch(err) {
      console.log('Ошибка редактирования книги', err);
      return null
    }
  }

  public async deleteBook(id: string): Promise<IBookDoc | null> {
    try {
      const deletedBook = await Book.findByIdAndDelete(id, {new: true});
      return deletedBook
    } catch(err) {
      console.log('Ошибка при удалении книги', err);
      return null
    }
  }
}