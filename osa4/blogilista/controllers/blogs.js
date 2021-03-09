const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// blogsRouter.get('/', (request, response) => {
//   response.send('<div>test</div>')
// })
const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async(request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response, next) => {
  // const blog = new Blog(request.body)

  // blog.save().then((result) => {
  //   response.status(201).json(result)
  // })
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token ||! decodedToken.id) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }




  //console.log('bodyid', body.userId)
  const user = await User.findById(decodedToken.id)
  //console.log('Userid', user)
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
  response.json(savedBlog.toJSON())

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

blogsRouter.delete('/:id', async(request, response) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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
  response.json(updatedBlog)

})

module.exports = blogsRouter
