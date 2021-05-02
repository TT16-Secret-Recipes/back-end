const router = require('express').Router()
const Ingredients = require('./model')

router.get('/', (req, res, next) => {
  Ingredients.findAll()
    .then(ingredients => {
      res.status(200)
      .json(ingredients.map(ingredient => ingredient.name))
    })
    .catch(next)
})


module.exports = router