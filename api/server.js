const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const restricted = require('./auth/restricted')

const authRouter = require('./auth/router')
const usersRouter = require('./users/router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

//error handling middleware
server.use((err, req, res, next) => {//eslint-disable-line
  res.status(500).json({ error: err, message: err.message })
})

server.use("/api/auth", authRouter)
server.use("/api/users", restricted(), usersRouter)

module.exports = server
