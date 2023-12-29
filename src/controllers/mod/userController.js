const User = require("../../models/User");

const userController = {
  getLoginPage: (req, res) => {
    res.render("user/login");
  },

  login: (req, res) => {
    console.log("req.user: ", req.user);
    res.redirect("/");
  },
};

module.exports = userController;
