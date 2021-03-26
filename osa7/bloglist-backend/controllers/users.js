const bcrypt = require('bcrypt')
const { response } = require('../app')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async(req,res) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author:1, id: 1 })
  res.json(users.map(n => n.toJSON()))
})

usersRouter.post('/', async(req, res) => {
  const body = req.body

  if(body.password.length < 3) {
    return res.status(400).json({ error: 'password too short' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  res.json(savedUser)
})
module.exports = usersRouter