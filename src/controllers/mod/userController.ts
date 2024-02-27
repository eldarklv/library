import User from "../../models/User";
import { Request, Response, NextFunction } from "express";

class userController {
  getLoginPage(req: Request, res: Response) {
    res.render("user/login");
  };

  login(req: Request, res: Response) {
    console.log("req.user: ", req.user);
    res.redirect("/");
  };

  getMePage(req: Request, res: Response) {
    res.render("user/me", { user: req.user });
  };

  logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }

  getSignupPage(req: Request, res: Response) {
    res.render("user/signup");
  };

  signup(req: Request, res: Response) {
    const newUser = new User(req.body);
    newUser.save();
    res.redirect("/");
  };
};

export default new userController();
