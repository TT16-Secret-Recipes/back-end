const db = require('../data/db-config')

const find = () => {
  return db('users')
}

const findBy = query => { 
  return db('users')
    .select('id', 'email', 'username')
    .where(query)
}


module.exports = {
  find,
  findBy
}