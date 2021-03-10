const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

let token
let user

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'author1',
    url: 'www.url1.com',
    likes: 1,
  },
  {
    title: 'HTML is HARD',
    author: 'author2',
    url: 'www.author2blog.com',
    likes: 4,
  },
]

beforeAll((done) => {
  api
    .post('/api/login')
    .send({
      username: 'testikayttaja',
      password: 'werisikritwoort'
    })
    .end((err, response) => {
      // console.log('mit',response.body)
      user = response.body
      token = response.body.token
      done()
    })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()


})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first blog is about HTML is easy', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('HTML is easy')
})

test('a valid blog can be added', async() => {

  const newBlog = {
    title: 'New blog',
    author: 'New author',
    url: 'www.newurl.com',
    likes: 0,
    user: user._id
  }
  await api
    .post('/api/blogs')
    .auth(token, { type:'bearer' } )
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(t => t.title)

  expect(response.body).toHaveLength(initialBlogs.length+1)
  expect(titles).toContain('New blog')

})

test('blog id field is named id', async () => {

  const response = await api.get('/api/blogs')

  expect((response.body[0]).id).toBeDefined()
  expect((response.body[1]).id).toBeDefined()
})

test('blog without title and url is not added', async () => {
  const newBlog = {
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .auth(token, { type:'bearer' } )
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog without likes get likes set to 0', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'No likes author',
    url: 'www.nolikes.com',

  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .auth(token, { type:'bearer' } )
    .expect(200)

  const response = await api.get('/api/blogs')


  expect(response.body[2].likes).toBe(0)
})

test('blog cant be added if no auth', async() => {
  const newBlog = {
    title: 'New blog',
    author: 'New author',
    url: 'www.newurl.com',
    likes: 0,
    user: user._id
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)

})

afterAll(() => {
  mongoose.connection.close()
})