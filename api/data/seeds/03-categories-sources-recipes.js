exports.seed = async function (knex) {
  await knex("recipe_categories").del();
  await knex("categories").del();
  await knex("recipes").del();
  await knex("sources").del();

  await knex("sources").insert([
    { source: "Garrick's Mom" }, //1
    { source: "Facebook" }, //2
    { source: "NYT Cooking" }, //3
    { source: "Self Creation" }, //4
    { source: "Family Cookbook" }, //5
  ]);
  await knex("recipes").insert([
    {  //1
      title: "Easy Cheese Pizza",
      user_id: 1,
      source_id: 2,
      description: "really yummy dish",
      image_url: "https://bit.ly/3xu1asr",
    },
    {  //2
      title: "SALAD Recipe",
      user_id: 2,
      source_id: 1,
      description: "Great for greenery dish",
      image_url: "https://bit.ly/3xu1asr",
    },
    {  //3
      title: "Meatballs",
      user_id: 3,
      source_id: 4,
      description: "Very Meaty",
      image_url: "/images/recipes/3.jpg",
    },
    {  //4
      title: "Vegan Meatballs",
      user_id: 1,
      source_id: 5,
      description: "So Not-Meaty",
      image_url: "/images/recipes/4.jpg",
    },
  ]);
  await knex("categories").insert([
    { category: "Dinner" }, //1
    { category: "Asian" }, //2
    { category: "Easy" }, //3 
    { category: "Cheap" }, //4 
    { category: "Spicy" }, //5 
    { category: "Saucy" }, //6
    { category: "Vegan" }, //7
    { category: "Vegetarian" }, //8
    { category: "Italian" }, //9
  ]);
  await knex("recipe_categories").insert([
    { recipe_id: 1, category_id: 1 }, 
    { recipe_id: 2, category_id: 2 }, 
    { recipe_id: 2, category_id: 4 }, 
    { recipe_id: 3, category_id: 3 }, 
    { recipe_id: 4, category_id: 4 },
    { recipe_id: 4, category_id: 7 },
    { recipe_id: 4, category_id: 8 },
    { recipe_id: 4, category_id: 9 },
  ]);
};
