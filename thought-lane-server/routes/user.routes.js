const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user.controller.js");
const { validateUser } = require("../middleware/validation");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", validateUser, registerUser);
router.post("/login", validateUser, loginUser);
router.get("/me", authMiddleware, getUserProfile);

module.exports = router;
