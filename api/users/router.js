const router = require('express').Router()
const User = require('./model')
const restricted = require('../auth/restricted')

router.get("/", restricted('admin_only'), (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get("/:id", restricted('user_id'), (req, res, next) => {
  const { id } = req.params
  User.findBy({ id })
    .then(([user]) => {
      res.status(200).json(user)
    })
    .catch(next)
})

module.exports = router