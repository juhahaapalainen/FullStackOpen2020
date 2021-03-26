const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {

  const blogs = await Blog.find({}).populate('user',{ _id: 1, username: 1, name:1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', userExtractor, async(request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  Blog.findOne({ _id: blog._id })
    .populate('user',{ _id: 1, username: 1, name:1 })
    .then(blg => {
      response.json(blg.toJSON())
    })

  // response.json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async(request, response) => {
  const id = request.params.id
  const comment = request.body.comment
  const commentedBlog = await Blog.findById(id)

  console.log('AddComment id:', id)
  console.log('add comment blog:', commentedBlog)
  console.log('Add comment:', comment)

  if(commentedBlog) {
    commentedBlog.comments = commentedBlog.comments.concat(comment)
    const savedBlog = await commentedBlog.save()
    Blog.findOne({ _id: savedBlog._id })
      .populate('user',{ _id: 1, username: 1, name:1 })
      .then(blg => {
        response.json(blg.toJSON())
      })
  } else {
    response.status(404).end()
  }

})

blogsRouter.get('/:id', async(request, response) => {

  const blog = await Blog.findById(request.params.id)

  if(blog) {
    response.json(blog.toJSON())
  }
  else {
    response.status(404).end()
  }

})

blogsRouter.delete('/:id',userExtractor, async(request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if(blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'missing or invalid token' })
  }

})

blogsRouter.put('/:id',async(request,response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })

  Blog.findOne({ _id: updatedBlog._id })
    .populate('user',{ _id: 1, username: 1, name:1 })
    .then(blg => {
      response.json(blg.toJSON())
    })


  // response.json(updatedBlog)

})



module.exports = blogsRouter
