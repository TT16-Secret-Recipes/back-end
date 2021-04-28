const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const restricted = require('./auth/restricted')

const authRouter = require('./auth/router')
const usersRouter = require('./users/router')
const recipesRouter = require('./recipes/router')
const uploadRouter = require('./upload/router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

//error handling middleware
server.use((err, req, res, next) => {//eslint-disable-line
  res.status(500).json({ error: err, message: err.message })
})

server.use(express.static('public'))
server.use("/api/auth", authRouter)
server.use("/api/recipes", recipesRouter)
server.use("/api/users", restricted(), usersRouter)
server.use("/api/upload", uploadRouter)

module.exports = server
