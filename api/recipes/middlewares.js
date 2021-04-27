const Recipe = require("./model");

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
  const { source, title, user_id } = req.body;
  if (!source || !source.trim() || !title || !title.trim() || !user_id) {
    res
      .status(400)
      .json("please provide a valid title, source and user with your recipe");
  } else {
    next();
  }
};

module.exports = {
  checkRecipeExists,
  validateRecipe,
};
