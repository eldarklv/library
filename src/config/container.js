import "reflect-metadata";
import { Container } from "inversify";
import { BookRepositoryImpl } from "../classes/BookRepositoryImpl";

const container = new Container();

container.bind(BookRepositoryImpl).toSelf();

export { container };
