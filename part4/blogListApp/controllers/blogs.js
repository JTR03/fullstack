const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogRouter.post("/", (req, res, next) => {
  const body = req.body;
  console.log(body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => res.json(savedBlog))
    .catch((err) => next(err));
});

module.exports = blogRouter