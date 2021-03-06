const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const restricted = require('./auth/restricted')

const authRouter = require('./auth/router')
const usersRouter = require('./users/router')
const recipesRouter = require('./recipes/router')
const uploadRouter = require('./upload/router')
const sourcesRouter = require('./sources/router')
const categoriesRouter = require('./categories/router')
const ingredientsRouter = require('./ingredients/router')

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
server.use("/api/upload", restricted(), uploadRouter)
server.use("/api/sources", restricted(), sourcesRouter)
server.use("/api/categories", restricted(), categoriesRouter)
server.use("/api/ingredients", restricted(), ingredientsRouter)

module.exports = server
