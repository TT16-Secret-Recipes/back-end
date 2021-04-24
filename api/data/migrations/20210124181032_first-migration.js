exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments()
      users.string('email', 320).unique().notNullable()
      users.string('username', 200).unique().notNullable()
      users.string('password', 200).notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users')
}
