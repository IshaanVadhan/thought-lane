const { body } = require("express-validator");

exports.validateUser = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required"),
];

exports.validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").optional().isString().withMessage("Content must be a string"),
];
