const router = require('express').Router()
const Sources = require('./model')

router.get('/', (req, res, next) => {
  Sources.findAll()
    .then(sources => {
      res.status(200)
      .json(sources.map(source => source.source))
    })
    .catch(next)
})


module.exports = router