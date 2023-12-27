const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/me", (req, res) => {});

router.post("/login", (req, res) => {
  console.log(req);
  res.json({ success: true });
});

router.post("/signup", (req, res) => {});

module.exports = router;

// GET /api/user/login   страница с формой входа / регистрации
// GET /api/user/me      страница профиля
// POST /api/user/login
// POST /api/user/signup
