const db = require('../data/db-config')

const findAll = () => {
  return db('sources').select('source')
}

module.exports = {
  findAll,
}