const router = require("express").Router();
const { checkRecipeExists, validateRecipe } = require("./middlewares");
const Recipes = require("./model");

router.get("/", (req, res, next) => {
  Recipes.getAll()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/:id", checkRecipeExists, (req, res, next) => {
  if (req.recipe) {
    res.status(200).json(req.recipe);
  } else {
    next;
  }
});

router.post("/", validateRecipe, (req, res, next) => {
  Recipes.insert(req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

module.exports = router;
