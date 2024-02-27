import { Request, Response, NextFunction } from "express";

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/mod/user/login");
  }
  next();
};

export default ensureAuthenticated;