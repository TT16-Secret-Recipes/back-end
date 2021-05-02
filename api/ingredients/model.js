const db = require('../data/db-config')

const findAll = () => {
  return db('ingredients')
}

module.exports = {
  findAll,
}