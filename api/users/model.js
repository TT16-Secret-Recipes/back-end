const db = require('../data/db-config')

const findBy = query => {
  return db('users')
    .where(query)
}

module.exports = {
  findBy,
  
}