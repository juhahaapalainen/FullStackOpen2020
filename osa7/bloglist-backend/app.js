const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRoute = require('./controllers/users')
const loginRoute = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to ', config.MONGODB_URI)
logger.info('node_env', process.env.NODE_ENV)
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
//app.use('/', blogsRouter)
app.use(middleware.tokenExtractor)
//app.use(middleware.userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRoute)
app.use('/api/login', loginRoute)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  logger.info('api/testingissa')
  app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app
