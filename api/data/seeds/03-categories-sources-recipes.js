
exports.seed = async function (knex) {
  await knex('recipe_categories').del()
  await knex('categories').del()
  await knex('recipes').del()
  await knex('sources').del()
  
  await knex('sources').insert([
    { id: 1, source: "Garrick's Mom"},
    { id: 2, source: 'Facebook' },
    { id: 3, source: 'NYT Cooking' },
  ])
  await knex('recipes').insert([
    {
      title: 'Easy Cheese Pizza',
      id: 1,
      user_id: 1,
      source_id: 1,
      description:'really yummy dish',
      image_url: 'https://bit.ly/3xu1asr'

    },
    {
      title: 'SALAD Recipe',
      id: 2,
      user_id: 1,
      source_id: 1,
      description:'Great for greenery dish',
      image_url: 'https://bit.ly/3xu1asr'
    },
  ])
  await knex('categories').insert([
    { id: 1, category: 'Dinner' },
    { id: 2, category: 'Asian' },
    { id: 3, category: 'Easy' },
  ])
  await knex('recipe_categories').insert([
    { id: 1, recipe_id: 1, category_id: 1 },
    { id: 2, recipe_id: 2, category_id: 2 },
    { id: 3, recipe_id: 1, category_id: 3 },
  ])
}
