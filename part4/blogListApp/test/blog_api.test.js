const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("should be Json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
},1000000);

test("should return all blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("should have unique identifier id", async () => {
  const res = await helper.blogsInDb();
  const one = res.map((blog) => blog.id);
  console.log(one);

  expect(one).toBeDefined();
});

test("should post a new blog to the list", async () => {
  const newBlog = {
    title: "the man who can",
    author: "Someone",
    url: "http:jonathan.com",
    likes: 123,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  const atEnd = await helper.blogsInDb();
  const blogs = atEnd.map((b) => b.title);
  expect(atEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(blogs).toContain("the man who can");
});

// test('should be 0 if no likes specified', async () => { 
    // const newPost = {
        // title: 'Testing is essential',
        // author: 'Golden',
        // url: 'https:jaminelks.com'
    // }
// 
    // const likes = newPost.likes
// 
    // await api.post('/api/blogs').send(newPost).expect(likes).toBe(0)
//  })

test('should not add not without title or url', async () => { 
    const newPost = {
        // title: 'join in the fun',
        url:"http: youndmind.com",
        author: 'jameson',
        likes: 125
    }

    await api.post('/api/blogs').send(newPost).expect(400)
 })

afterAll(async () => {
  await mongoose.connection.close();
});
