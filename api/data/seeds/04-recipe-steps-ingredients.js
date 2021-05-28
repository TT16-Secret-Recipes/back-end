exports.seed = async function (knex) {
  await knex("recipe_ingredients").del();
  await knex("ingredients").del();
  await knex("steps").del();

  await knex("steps").insert([
    { instructions: "Cut vegetables and mix-ins", step_number: 1, recipe_id: 2 },
    { instructions: "Mix ingredients in bowl", step_number: 2, recipe_id: 2 },
    { instructions: "Dress and season", step_number: 3, recipe_id: 2 },
    { instructions: "Saute mushrooms under low heat with coconut oil", step_number: 1, recipe_id: 4 },
    { instructions: "Combine with bread crumbs, salt, and italian parsley.  Add a little vegetable broth if too dry", step_number: 2, recipe_id: 4 },
    { instructions: "Form into 1 inch balls", step_number: 3, recipe_id: 4 },
    { instructions: "Bake for 15 minutes or until golden brown", step_number: 4, recipe_id: 4 },
  ]);
  await knex("ingredients").insert([
    { name: "cheese"}, //1
    { name: "sauce" }, //2
    { name: "salt" }, //3
    { name: "soy" }, //4
    { name: "flour" }, //5
    { name: "beef" }, //6
    { name: "chopped mushrooms" }, //7
    { name: "coconut oil" }, //8
    { name: "bread crumbs" }, //9
    { name: "italian parsley, finely chopped" },  //10
  ]);
  await knex("recipe_ingredients").insert([
    { quantity: 4, unit: "cups", recipe_id: 1, ingredient_id: 1 },
    { quantity: 10, unit: "bowls", recipe_id: 1, ingredient_id: 2 },
    { quantity: 2, unit: "cups", recipe_id: 2, ingredient_id: 3 },
    { quantity: 99999, unit: "mg", recipe_id: 3, ingredient_id: 6 },
    { quantity: 1, unit: "lb", recipe_id: 4, ingredient_id: 7 },
    { quantity: 2, unit: "tbsp", recipe_id: 4, ingredient_id: 8 },
    { quantity: 2, unit: "cups", recipe_id: 4, ingredient_id: 9 },
    { quantity: .25, unit: "cup", recipe_id: 4, ingredient_id: 10 },
    { quantity: 1, unit: "tsp", recipe_id: 4, ingredient_id: 4 },
  ]);
};
