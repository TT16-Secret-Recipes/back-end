const router = require('express').Router()
const Recipes = require('./model')


router.get("/", (req, res, next) => {
    Recipes.getAll()
      .then(recipes => {
        res.status(200).json(recipes)
      })
      .catch(next)
  })

router.get("/:id", (req, res, next) => {
  Recipes.getById(req.params.id)
    .then(recipe => {
      res.status(200).json(recipe)
    })
    .catch(next)
})

router.post("/", (req, res, next) => {
  Recipes.insert(req.body)
    .then(recipe => {
      res.status(201).json(recipe)
    })
    .catch(next)
})

module.exports = router