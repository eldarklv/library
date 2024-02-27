import express from "express"
import userController from "../../controllers/api/userController";

const router = express.Router();

router.post("/login", userController.login);

module.exports = router