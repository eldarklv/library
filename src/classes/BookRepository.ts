import { Book } from "../interfaces/BookInterface"

abstract class BookRepository {
  abstract createBook(book: Book): Promise<void>;

  abstract getBook(id: string): Promise<Book | null>;

  abstract getBooks(): Promise<Book[]>

  abstract updateBook(id: string, book: Book): Promise<void>;

  abstract deleteBook(id: string): Promise<void>;
}