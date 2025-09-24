const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try{
    const blogs = await Blog.find({})
      .populate('user', {
        username: 1, name: 1
      })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user
  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog ({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user,
    likes: body.likes
  })
  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }

})

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.user
  if(!user){
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if(blog.user.toString() !== user.id.toString() ){
    return response.status(403).json({ error: 'permission denied: only creator can delete' })
  }

  try {
    const result = await Blog.findByIdAndDelete(request.params.id);
    if (result) {
      response.status(204).end();
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    next(error);
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  const { user, title, author, url, likes } = request.body;
const id = request.params.id
  try {
    const updateData = { title, author, url, likes };
    if(user){
      updateData.user = user
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("user", { username: true, name: true })

    if (updatedBlog) {
      console.log(updatedBlog)
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter