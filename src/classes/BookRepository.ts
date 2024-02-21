import { IBook } from "../interfaces/IBook"

export abstract class BookRepository {
  abstract createBook(book: IBook): Promise<IBook | null>;

  abstract getBook(id: string): Promise<IBook | null>;

  abstract getBooks(): Promise<IBook[]>

  abstract updateBook(id: string, book: IBook): Promise<void>;

  abstract deleteBook(id: string): Promise<void>;
}