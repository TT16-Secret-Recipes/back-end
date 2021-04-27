const router = require('express').Router()
const jwt = require('jsonwebtoken')

const User = require('../users/model')

const { validate, hash, authenticate } = require('./middlewares')

router.post('/register', validate, hash, (req, res, next) => {
  User.add(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
})

router.post('/login', validate, authenticate, (req, res) => {
    const { user } = req
    const payload = {
      subject: user.id,
      username: user.username,
      email: user.email
    }
    const options = {
      expiresIn: '1000 seconds'
    }
    const token = jwt.sign(payload, "KEEP IT SECRET", options)
    res.status(200).json({
      message: `Welcome back, ${user.username}!`,
      user: { id: user.id, username: user.username, email: user.email },
      token
    })
  
})

module.exports = router