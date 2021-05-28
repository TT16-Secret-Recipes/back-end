const db = require("../data/db-config");

const getAll = async () => {
  const recipes = await db("recipes as r")
    .select(
      "r.id",
      "r.title",
      "s.source",
      "u.username as contributor",
      "r.description",
      "r.image_url"
    )
    .join("sources as s", "s.id", "r.source_id")
    .join("users as u", "u.id", "r.user_id")
    .orderBy("r.id");

  return Promise.all(
    recipes.map(async (recipe) => {
      const categories = await db("categories as c")
        .select("c.category")
        .join("recipe_categories as rc", "rc.category_id", "c.id")
        .where({ recipe_id: recipe.id });

      return {
        ...recipe,
        categories: categories.map((category) => category.category),
      };
    })
  );
};

const getAllBy = async (query) => {
  const recipes = await db("recipes as r")
    .select(
      "r.id",
      "r.title",
      "s.source",
      "u.username as contributor",
      "r.description",
      "r.image_url",
      "u.id as user_id"
    )
    .join("sources as s", "s.id", "r.source_id")
    .join("users as u", "u.id", "r.user_id")
    .where(query);

  return Promise.all(
    recipes.map(async (recipe) => {
      const categories = await db("categories as c")
        .select("c.category")
        .join("recipe_categories as rc", "rc.category_id", "c.id")
        .where({ recipe_id: recipe.id });

      return {
        ...recipe,
        categories: categories.map((category) => category.category),
      };
    })
  );
};

const getById = async (recipe_id) => {
  const recipe = await db("recipes as r")
    .select(
      "r.id",
      "r.title",
      "s.source",
      "u.username as contributor",
      "r.description",
      "r.image_url"
    )
    .join("sources as s", "s.id", "r.source_id")
    .join("users as u", "u.id", "r.user_id")
    .where("r.id", recipe_id)
    .first();

  const steps = await db("steps")
    .select("step_number", "instructions")
    .where({ recipe_id })
    .orderBy("step_number");

  const ingredients = await db("ingredients as i")
    .select("name", "quantity", "unit")
    .join("recipe_ingredients as ri", "ri.ingredient_id", "i.id")
    .where("ri.recipe_id", recipe_id);

  const categories = await db("recipe_categories as rc")
    .where({ recipe_id })
    .join("categories as c", "c.id", "rc.category_id")
    .select("category");

  return {
    ...recipe,
    steps,
    ingredients,
    categories: categories.map((category) => category.category),
  };
};

const insert = async (user_id, recipe) => {
  const { source, categories, steps, ingredients } = recipe;
  let recipe_id;
  await db.transaction(async (trx) => {
    // insert source
    let source_id;
    const [existing_source] = await trx("sources").where({ source });
    if (existing_source) {
      source_id = existing_source.id;
    } else {
      let [{ id }] = await trx("sources").insert({ source }, ["id"]);
      source_id = id;
    }

    // insert categories
    const category_ids = await Promise.all(
      categories.map(async (category) => {
        let category_id;
        const [existing_category] = await trx("categories").where({ category });
        if (existing_category) {
          category_id = existing_category.id;
        } else {
          let [{ id }] = await trx("categories").insert({ category }, ["id"]);
          category_id = id;
        }
        return category_id;
      })
    );

    // insert recipe
    const { description, title, image_url } = recipe;
    const [{ id }] = await trx("recipes").insert(
      { description, title, image_url, source_id, user_id },
      ["id"]
    );

    recipe_id = id;

    // insert recipe_categories
    await Promise.all(
      category_ids.map((category_id) => {
        return trx("recipe_categories").insert({ category_id, recipe_id });
      })
    );

    // insert steps
    await Promise.all(
      steps.map((step) => {
        return trx("steps").insert({ recipe_id, ...step });
      })
    );

    // insert recipe_ingredients
    await Promise.all(
      ingredients.map(async (ingredient) => {
        const { name } = ingredient;
        let ingredient_id;
        const [existing_ingredient] = await trx("ingredients").where({ name });

        if (existing_ingredient) {
          ingredient_id = existing_ingredient.id;
        } else {
          const [{ id }] = await trx("ingredients").insert({ name }, ["id"]);
          ingredient_id = id;
        }
        const { quantity, unit } = ingredient;
        return trx("recipe_ingredients").insert({
          recipe_id,
          ingredient_id,
          quantity,
          unit,
        });
      })
    );
  });

  return getById(recipe_id);
};

const remove = async (id) => {
  return db("recipes").where({ id }).del();
};

const update = async (id, recipe) => {
  const { source, categories, steps, ingredients } = recipe;

  await db.transaction(async (trx) => {
    // insert source
    let source_id;
    if (source) {
      const [existing_source] = await trx("sources").where({ source });
      if (existing_source) {
        source_id = existing_source.id;
      } else {
        let [{ id }] = await trx("sources").insert({ source }, ["id"]);
        source_id = id;
      }
    }

    if (categories && categories.length > 0) {
      // insert categories track ids
      const category_ids = await Promise.all(
        categories.map(async (category) => {
          let category_id;
          const [existing_category] = await trx("categories").where({
            category,
          });
          if (existing_category) {
            category_id = existing_category.id;
          } else {
            let [{ id }] = await trx("categories").insert({ category }, ["id"]);
            category_id = id;
          }
          return category_id;
        })
      );

      // recipe_categories
      await trx("recipe_categories").where({ recipe_id: id }).del();

      await trx("recipe_categories").insert(
        category_ids.map((category_id) => {
          return { category_id, recipe_id: id };
        })
      );
    }

    // update recipe
    const { description, title, image_url } = recipe;
    await trx("recipes")
      .where({ id })
      .update({ description, title, image_url, source_id });

    // steps
    if (steps && steps.length > 0) {
      // update steps with instructions
      steps.map(async ({ step_number, instructions }) => {
        const [step] = await trx("steps")
          .where({ recipe_id: id, step_number })
        if (step){
          return trx("steps")
            .where({ recipe_id: id, step_number })
            .update({ instructions });
        } else {
          return trx("steps")
            .insert({ step_number, instructions, recipe_id: id })
        }
      });

      // delete extra steps
      await trx("steps")
        .where({ recipe_id: id, })
        .andWhere("step_number", ">", steps.length)
        .del();
    }

    //recipe_ingredients
    if (ingredients && ingredients.length > 0) {
      const ingredient_ids = await Promise.all(
        ingredients.map(async (ingredient) => {
          const { name, quantity, unit } = ingredient;
          let ingredient_id;
          const [existing_ingredient] = await trx("ingredients").where({
            name,
          });

          let updated;
          if (existing_ingredient) {
            ingredient_id = existing_ingredient.id;
            updated = await trx("recipe_ingredients")
              .where({ recipe_id: id, ingredient_id })
              .update({ quantity, unit });
          } else {
            const [{ id }] = await trx("ingredients").insert({ name }, ["id"]);
            ingredient_id = id;
          }

          if (!updated) {
            await trx("recipe_ingredients").insert({
              recipe_id: id,
              ingredient_id,
              quantity,
              unit,
            });
          }
          return ingredient_id;
        })
      );
      await trx("recipe_ingredients")
        .where({ recipe_id: id })
        .whereNotIn("ingredient_id", ingredient_ids)
        .del();
    }
  });

  return getById(id);
};

module.exports = {
  getAll,
  getAllBy,
  getById,
  insert,
  remove,
  update,
};
