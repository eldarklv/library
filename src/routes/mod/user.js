const express = require("express");
const userController = require("../../controllers/mod/userController");
const passport = require("passport");

const router = express.Router();

router.get("/login", userController.getLoginPage);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/mod/user/login" }),
  userController.login
);

module.exports = router;
