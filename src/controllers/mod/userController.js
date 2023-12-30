const User = require("../../models/User");

const userController = {
  getLoginPage: (req, res) => {
    res.render("user/login");
  },

  login: (req, res) => {
    console.log("req.user: ", req.user);
    res.redirect("/");
  },

  getMePage: (req, res) => {
    res.render("user/me", { user: req.user });
  },

  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  },

  getSignupPage: (req, res) => {
    res.render("user/signup");
  },

  signup: (req, res) => {
    const newUser = new User(req.body);
    newUser.save();
    res.redirect("/");
  },
};

module.exports = userController;
