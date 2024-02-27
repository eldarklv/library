import express from "express"
import userController from "../../controllers/mod/userController";
import passport from "passport";
import ensureAuthenticated from "../../middleware/ensureAuthenticated";

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

export default router;
