import { Request, Response } from "express";

const notFoundHandler = (req: Request, res: Response) => {
  res.render("errors/404", {
    title: "404 | Не найдено",
  });
};

export default notFoundHandler
