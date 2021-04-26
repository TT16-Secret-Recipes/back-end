const router = require('express').Router()
const Recipes = require('./model')


router.get("/", (req, res, next) => {
    Recipes.getAll()
      .then(recipes => {
        res.status(200).json(recipes)
      })
      .catch(next)
  })

module.exports = router