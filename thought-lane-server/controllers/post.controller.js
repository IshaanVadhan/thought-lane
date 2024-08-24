const Post = require("../models/post.model");
const { validationResult } = require("express-validator");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const post = new Post({
      ...req.body,
      createdBy: req.user._id,
    });
    await post.save();
    const populatedPost = await Post.findById(post._id)
      .populate({
        path: "createdBy",
        select: "-password",
      })
      .exec();
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "createdBy",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate({
      path: "createdBy",
      select: "-password",
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const posts = await Post.find({ createdBy: userId })
      .populate({
        path: "createdBy",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(id).populate({
      path: "createdBy",
      select: "-password",
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      post.likes = post.likes.filter((like) => !like.equals(userId));
    } else {
      post.likes.push(userId);
    }
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json({ message: "Post deleted", id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      user: req.user._id,
      comment,
    };

    post.comments.push(newComment);
    await post.save();

    const populatedPost = await Post.findById(id)
      .select({ comments: { $slice: -1 } })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    const lastComment = populatedPost.comments[0];

    const response = {
      user: {
        _id: lastComment.user._id,
        name: lastComment.user.name,
        avatar: lastComment.user.avatar,
      },
      comment: lastComment.comment,
      _id: lastComment._id,
      createdAt: lastComment.createdAt,
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getComments = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("comments.user", "-password");
    if (!post) return res.status(404).json({ message: "Post not found" });

    const sortedComments = post.comments.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.json(sortedComments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
