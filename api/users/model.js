const db = require('../data/db-config')

const findBy = query => {
  return db('users')
    .where(query)
}

const add = async user => {
  const [id] = await db('users').insert(user, 'id')
  return findBy({ id }).first()
}

module.exports = {
  findBy,
  add
}