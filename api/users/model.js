const db = require('../data/db-config')

const find = () => {
  return db('users')
}

const findBy = query => { 
  return db('users')
    .select('id', 'email', 'username')
    .where(query)
}

const add = async user => {
  const [{ id }] = await db('users').insert(user, ['id'])
  return findBy({ id })
}
module.exports = {
  find,
  findBy,
  add
}