exports.up = function (knex) {
  return knex.schema
    .createTable("sources", (tbl) => {
      tbl.increments();
      tbl.string("source", 128).notNullable().unique();
    })
    .createTable("recipes", (tbl) => {
      tbl.increments();
      tbl.string("title", 128).notNullable();
      tbl.string("description", 512);
      tbl.string("image_url");
      tbl
        .integer("user_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("source_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("sources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("categories", (tbl) => {
      tbl.increments();
      tbl.string("category").notNullable().unique();
    })
    .createTable("recipe_categories", (tbl) => {
      tbl.increments();
      tbl
        .integer("category_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("categories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("recipe_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("recipe_categories")
    .dropTableIfExists("categories")
    .dropTableIfExists("recipes")
    .dropTableIfExists("sources");
};
