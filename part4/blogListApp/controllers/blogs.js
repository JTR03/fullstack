const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.post("/",async (req, res) => {
  const body = req.body;
  console.log(body);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog
    .save()
     res.status(201).json(savedBlog)
})


blogRouter.delete("/:id", async (req,res) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put("/:id", async (req,res) => {
  const {title,author,likes} = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,author,likes
    },
    {
      new: true, context:'query'
    }
  )
  res.json(updatedBlog)
})

module.exports = blogRouter;
