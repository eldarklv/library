const express = require("express");
const userController = require("../../controllers/mod/userController");
const passport = require("passport");
const ensureAuthenticated = require("../../middleware/ensureAuthenticated");

const router = express.Router();

router.get("/login", userController.getLoginPage);

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/mod/user/login" }),
  userController.login
);

router.get("/me", ensureAuthenticated, userController.getMePage);

router.get("/logout", userController.logout);

router.get("/signup", userController.getSignupPage);

router.post("/signup", userController.signup);

module.exports = router;
