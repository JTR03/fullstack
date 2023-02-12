const jwt = require('jsonwebtoken')
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = req => {
  const auth = req.get('authorization')
  if(auth && auth.startsWith('Bearer ')){
    return auth.replace('Bearer ','')
  }
  return null
}

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1});
  res.json(blogs);
});

blogRouter.post("/", async (req, res) => {
  const body = req.body;
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({error: 'invalid token'})
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const { title, author, likes } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title,
      author,
      likes,
    },
    {
      new: true,
      context: "query",
    }
  );
  res.json(updatedBlog);
});

module.exports = blogRouter;
