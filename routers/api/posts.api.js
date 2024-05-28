const express = require("express");
const router = express.Router();
const { db } = require("../../Data/.config/BlogDB.versedb");
const Posts = require("../../models/postsSchema");

/**
 * @description posts
 * @return all the posts in the blog's database
 */
router.get("/", async (req, res) => {
  Posts.load().then((posts) => {
    if (posts.acknowledged) {
      res.json(posts);
    } else if (!posts.acknowledged) {
      res.status(404).json(posts);
    }
  });
});

router.post("/", async (req, res) => {
  const data = await req.body;
  try {
    await Posts.add(data)
    return res.redirect("/api/posts")
  } catch (error) {
    console.error(error)
  } 
});

/**
 * @description posts/id
 * @return a post bu it's id
 */
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Posts.find({ _id: id }).then((post) => {
    if (post.acknowledged) {
      res.json(post);
    } else if (!post.acknowledged) {
      res.status(404).json(post);
    }
  });
});

router.delete("/:id", async (req, res) => {
  const id = await req.params.id;
  try {
    await Posts.remove({ _id: id })
    return res.redirect("/api/posts")
  } catch (error) {
    console.error(error)
  } 
});

module.exports = router;