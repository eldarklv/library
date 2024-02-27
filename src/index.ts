import express from "express";
import dotenv from "dotenv";
dotenv.config();
import notFoundHandler from "./middleware/404";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import userRouter from "./routes/mod/user";
import booksRouter from "./routes/api/books";
import modBooksRouter from "./routes/mod/books";
import indexRouter from "./routes/index";
import { createServer } from "node:http";
import { Server } from "socket.io";

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL || '';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.urlencoded({ extended: true })); // extended: true чтобы не было варнинга body-parser deprecated
app.use(express.json());
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("database/fileBooks"));
app.use("/", indexRouter);
app.use("/mod/user", userRouter);
app.use("/api/books", booksRouter);
app.use("/mod/books", modBooksRouter);
app.use(notFoundHandler);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

require("./config/passport");

io.on("connection", (socket) => {
  // работа с комнатами
  const { roomName } = socket.handshake.query;
  console.log(`Socket roomName: ${roomName}`);
  if (roomName) {
    socket.join(roomName);
    socket.on("message-to-room", (msg) => {
      socket.to(roomName).emit("message-to-room", msg);
      socket.emit("message-to-room", msg);
    });
  }

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

mongoose.connect(mongo_url).then(() => console.log("Mongo connected!"));
server.listen(port, () => {
  console.log(`Приложение запущено на порту ${port}`);
});
