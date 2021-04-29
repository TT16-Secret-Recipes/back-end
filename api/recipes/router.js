const router = require("express").Router();
const restricted = require('../auth/restricted')
const { checkRecipeExists, validateRecipe } = require("./middlewares");
const Recipes = require("./model");

router.use('/:id', checkRecipeExists, restricted('recipe_user'))

router.get("/", (req, res, next) => {
  Recipes.getAll()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  if (req.recipe) {
    res.status(200).json(req.recipe);
  } else {
    next;
  }
});

router.delete("/:id", (req, res, next) => {
    Recipes.remove(req.params.id).then(recipe => {
      res.status(200).json('Recipe has been deleted')
    }).catch(next)
  });

  router.put("/:id", (req, res, next) => {
    Recipes.update(req.params.id, req.body).then(recipe => {
      res.status(200).json(recipe)
    }).catch(next)
  });

router.post("/", restricted(), validateRecipe, (req, res, next) => {
  Recipes.insert(req.decodedToken.subject, req.body)
    .then((recipe) => {
      res.status(201).json(recipe);
    })
    .catch(next);
});

module.exports = router;
