const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require("bcrypt");

const api = supertest(app)
let token

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("testing", 10)
    const user = new User({ username: "test", passwordHash })
    await user.save()

    const loginRes = await api.post("/api/login").send({
      username: "test",
    password: "testing",
    });
    token = loginRes.body.token

    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  describe('addition of a new blog', () => {
    test('blog posts have unique identifier property named id', async () => {
      const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }

      const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set({Authorization: `Bearer ${token}`})
      .expect(201)
      .expect('Content-Type', /application\/json/)
      
      const blog = response.body

      assert.ok(blog.id, 'id property is defined')
      assert.strictEqual(blog._id, undefined)
    })

    test('verifies HTTP POST request successfully creates a new blog post', async () => {
      const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: `Bearer ${token}`})
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogAtEnd = await helper.blogInDb()
        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)
    })

    test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
      const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/"
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: `Bearer ${token}`})
        .expect(201)
        .expect('Content-Type', /application\/json/)

        assert.strictEqual(response.body.likes, 0)
    })

    test('bolg without title and url is not added', async () => {
      const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        likes: 10
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({Authorization: `Bearer ${token}`})
        .expect(400)
        .expect('Content-Type', /application\/json/)

        const blogAtEnd = await helper.blogInDb()
        assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
    })

    test('adding a blog fails, if a token is not provided', async () => {
      const newBlog = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 4
      }


      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})