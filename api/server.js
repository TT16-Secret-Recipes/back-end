const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./auth/router')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

//error handling middlware
server.use((err, req, res, next) => {//eslint-disable-line
  res.status(500).json({ error: err, message: err.message })
})

server.use("/api/auth", authRouter)

module.exports = server
