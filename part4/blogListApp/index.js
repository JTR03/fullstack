const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://jtr03:LGmsdYnYv5vCcG@cluster0.1ag70ar.mongodb.net/blogs?retryWrites=true&w=majority'
mongoose.set('strictQuery',false)
mongoose.connect(mongoUrl)




app.get('/',(req,res) => {
  res.send('<h1>Welcome To My Fav BlogLists</h1>')
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    mongoose.connection.close()
})

app.post('/api/blogs', (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  blog
    .save()
    .then(result => {
      response.json(result)
    })
    console.log(body);
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})