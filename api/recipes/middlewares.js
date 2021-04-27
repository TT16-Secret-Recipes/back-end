const Recipe = require("./model");
const db = require("../data/db-config")

const checkRecipeExists = async (req, res, next) => {
  Recipe.getById(req.params.id).then((recipe) => {
    if (recipe.id) {
      req.recipe = recipe;
      next();
    } else {
      res.status(404).json("I'm sorry, we couldn't find that recipe.");
    }
  });
};

const validateRecipe = async (req, res, next) => {
  const { source, title, user_id, ingredients, categories, steps } = req.body;
  if (!source || !source.trim() || !title || !title.trim() || !user_id) {
    res
      .status(400)
      .json("please provide a valid title, source and user with your recipe");
  } else {
    if(!ingredients)
      req.body.ingredients = []
    if(!categories)
      req.body.categories = []
    if(!steps)
      req.body.steps = []

    const user = await db('users').where({ id: user_id }).first()
    if(!user){
      res.status(400).json('incorrect user info')
      // return
    }
    next();
  }
};

module.exports = {
  checkRecipeExists,
  validateRecipe,
};
