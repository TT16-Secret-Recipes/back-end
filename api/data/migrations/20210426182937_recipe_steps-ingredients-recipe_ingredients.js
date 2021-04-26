
exports.up = function(knex) {
  return knex.schema
  .createTable('steps', steps => {
      steps.increments()
      steps.string('instructions').notNullable()
      steps.integer('step_number').notNullable().unsigned()
      steps.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  })
  .createTable('ingredients', ingredients => {
    ingredients.increments()
    ingredients.string('name').notNullable().unique()
  })
  .createTable('recipe_ingredients', recipe_ingredients => {
      recipe_ingredients.increments()
      recipe_ingredients.decimal('quantity').notNullable()
      recipe_ingredients.string('unit')
      recipe_ingredients.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      recipe_ingredients.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ingredients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
};
