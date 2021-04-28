exports.seed = async function (knex) {
  await knex("recipe_categories").del();
  await knex("categories").del();
  await knex("recipes").del();
  await knex("sources").del();

  await knex("sources").insert([
    { source: "Garrick's Mom" },
    { source: "Facebook" },
    { source: "NYT Cooking" },
  ]);
  await knex("recipes").insert([
    {
      title: "Easy Cheese Pizza",
      user_id: 1,
      source_id: 1,
      description: "really yummy dish",
      image_url: "https://bit.ly/3xu1asr",
    },
    {
      title: "SALAD Recipe",
      user_id: 1,
      source_id: 1,
      description: "Great for greenery dish",
      image_url: "https://bit.ly/3xu1asr",
    },
  ]);
  await knex("categories").insert([
    { category: "Dinner" },
    { category: "Asian" },
    { category: "Easy" },
  ]);
  await knex("recipe_categories").insert([
    { recipe_id: 1, category_id: 1 },
    { recipe_id: 2, category_id: 2 },
    { recipe_id: 1, category_id: 3 },
  ]);
};
