require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db.config");
const postRoutes = require("../routes/post.routes.js");
const userRoutes = require("../routes/user.routes.js");

const app = express();
connectDB();

app.use(
  cors({
    origin: "https://thought-lane.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api", postRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
