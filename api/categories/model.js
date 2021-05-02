const db = require('../data/db-config')

const findAll = () => {
  return db('categories').select('category')
}

module.exports = {
  findAll,
}