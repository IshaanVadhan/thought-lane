const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
  likePost,
  addComment,
  getComments,
} = require("../controllers/post.controller.js");
const { validatePost } = require("../middleware/validation.js");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

router.post("/posts", authMiddleware, validatePost, createPost);
router.get("/posts", authMiddleware, getPosts);
router.get("/posts/:id", authMiddleware, getPostById);
router.get("/user/:userId/posts", authMiddleware, getPostsByUserId);
router.put("/posts/:id", authMiddleware, validatePost, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);
router.put("/posts/:id/like", authMiddleware, likePost);
router.post("/posts/:id/comments", authMiddleware, addComment);
router.get("/posts/:id/comments", authMiddleware, getComments);

module.exports = router;
