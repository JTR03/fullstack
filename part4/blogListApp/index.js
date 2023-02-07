const app = require('./app')
const config = require('./util/config')
const logger = require('./util/logger')


app.listen(config.PORT, () => {
  logger.info(`Server running on ${config.PORT}`)
})


// app.use(cors())
// app.use(express.json())
// 
// 
// 
// 
// app.get('/',(req,res) => {
  // res.send('<h1>Welcome To My Fav BlogLists</h1>')
// })
// 
// app.get('/api/blogs', (request, response) => {
  // Blog
    // .find({})
    // .then(blogs => {
      // response.json(blogs)
    // })
    // mongoose.connection.close()
// })
// 
// app.post('/api/blogs', (request, response) => {
  // const body = request.body;
// 
  // const blog = new Blog({
    // title: body.title,
    // author: body.author,
    // url: body.url,
    // likes: body.likes
  // })
// 
  // blog
    // .save()
    // .then(result => {
      // response.json(result)
    // })
    // console.log(body);
// })
// 