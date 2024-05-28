const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const versedb = require("verse.db");
const { db } = require("./Data/.config/BlogDB.versedb");

const postsR = require("./routers/api/posts.api")

// app.use(
//   cors({
//     origin: ["https://versedb.jedi-studio.com"],
//     credentials: true,
//     optionsSuccessStatus: 200,
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Blog API!",
    routes: {
      "/api/posts": "Get all posts",
      "/api/posts/:id": "Get a single post by ID",

      "/api/posts/:id/comments": "Get all comments for a post",
      "/api/posts/:id/comments/:commentId": "Get a single comment by ID",
      "/api/posts/:id/comments/:commentId/edit": "Edit a comment",
      "/api/posts/:id/comments/:commentId/delete": "Delete a comment",
      "/api/posts/:id/comments": "Create a new comment",

      "/api/users": "Get all users",
      "/api/users/:id": "Get a single user by ID",
      "/api/users/:id/posts": "Get all posts by a user",
      "/api/users/:id/comments": "Get all comments by a user",

      "/api/categories": "Get all categories",
      "/api/categories/:id": "Get a single category by ID",
      "/api/categories/:id/posts": "Get all posts in a category",

      "/api/tags": "Get all tags",
      "/api/tags/:id": "Get a single tag by ID",
      "/api/tags/:id/posts": "Get all posts with a tag",

      "/api/search": "Search for posts",

      "/api/auth/login": "Login to the API",
      "/api/auth/register": "Register a new user",
      "/api/auth/logout": "Logout from the API",
      "/api/auth/me": "Get the current user",
    },
  });
});
app.use("/api/posts", postsR)

app.listen(5050, () => {
  console.clear();
  versedb.logger.logSuccess({
    content: "Server is running successfully!",
    devLogs: db.devLogs,
  });
});
