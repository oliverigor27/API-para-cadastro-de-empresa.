
exports.up = function(knex) {
  return knex.schema.createTable("business", function(table) {
        table.integer("user_id").references("users.id").notNullable().onDelete("CASCADE");
        table.increments("businessId");
        table.jsonb("data").notNullable();

        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  
};
