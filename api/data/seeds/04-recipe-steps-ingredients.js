
exports.seed = async function (knex) {
  await knex('recipe_ingredients').del()
  await knex('ingredients').del()
  await knex('steps').del()
  
  await knex('steps').insert([
    { id: 1, instructions: "Fry Pan", step_number: 1, recipe_id: 2},
    { id: 2, instructions: "Mix in bowl", step_number: 2, recipe_id: 2},
    { id: 3, instructions: "Fry Pan", step_number: 1, recipe_id: 2},

  ])
  await knex('ingredients').insert([
    {
      id: 1,
      name: "cheese"
    },
    {
      id: 2,
      name: "sauce"
    },
    {
      id: 3,
      name: "salt"
    },

  ])
  await knex('recipe_ingredients').insert([
    { id: 1, quantity: 4, unit: "cups", recipe_id: 1, ingredient_id: 1 },
    { id: 2, quantity: 10, unit: "bows", recipe_id: 1, ingredient_id: 2 },
    { id: 3, quantity: 2, unit: "cups", recipe_id: 2, ingredient_id: 3 },
  ])
}
