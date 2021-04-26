const db = require('../data/db-config')

const getAll = async () => {
  const recipes = await db('recipes as r')
    .select('r.id', 'r.title', 's.source', 
      'u.username as contributor', 'r.description', 
      'r.image_url')
    .join('sources as s', 's.id', 'r.source_id')
    .join('users as u', 'u.id', 'r.user_id')

    // recipe.steps = await Promise.all(steps.map(async step => {
    //   const ingredients = await db('step_ingredients as si')
    //     .select('i.id', 'i.name', 'si.quantity')
    //     .join('ingredients as i', 'i.id', 'si.ingredient_id')
    //     .where('si.step_id', step.step_id)
  
  return Promise.all(recipes.map(async recipe => {
    const categories = await db('categories as c')
      .select('c.category')
      .join('recipe_categories as rc', 'rc.category_id', 'c.id')
      .where({ recipe_id: recipe.id })

    recipe.categories = categories.map(category => {
      return category.category
    })
    
     return {...recipe}
  }))
  
  // return recipes_with_categories
}

module.exports = {
  getAll
}