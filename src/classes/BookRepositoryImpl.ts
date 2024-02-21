import { BookRepository } from "./BookRepository";
import { IBook } from "../interfaces/IBook";
import { Book } from "../models/Book";

export class BookRepositoryImpl extends BookRepository {
  public async createBook(book: IBook): Promise<IBook | null> {
    try {
      const newBook = new Book(book);
      await newBook.save();
      return newBook;
    } catch(err) {
      console.log('Ошибка создания книги', err);
      return null
    }
  }

  public async getBook(id: string): Promise<IBook | null> {
    try {
      const book = Book.findById(id);
      return book;
    } catch(err) {
      console.log('Ошибка при попытке получить книгу')
      return null
    }
  }

  public async getBooks(): Promise<IBook[]> {
    
  }

  public async updateBook(id: string, book: IBook): Promise<void> {
    
  }

  public async deleteBook(id: string): Promise<void> {
    
  }
}