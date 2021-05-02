const router = require('express').Router()
const Categories = require('./model')

router.get('/', (req, res, next) => {
  Categories.findAll()
    .then(categories => {
      res.status(200)
      .json(categories.map(category => category.category))
    })
    .catch(next)
})


module.exports = router
