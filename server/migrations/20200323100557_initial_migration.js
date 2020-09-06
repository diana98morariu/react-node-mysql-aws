//during a migration
exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id");
      table.string("firstName").notNullable();
      table.string("lastName").notNullable();
      table.string("username").unique().notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("resetPasswordToken").unique();
      table.string("resetPasswordExpires");
      table.timestamp("createdAt").defaultTo(knex.fn.now());
    })
    .createTable("properties", (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.string("description", 1500).notNullable();
      table.string("propertyImage").notNullable();
      table.string("address").notNullable();
      table.string("postalCode").notNullable();
      table.string("city").notNullable();
      table.string("country").notNullable();
      table.timestamp("createdAt").defaultTo(knex.fn.now());
      table.integer("userId").unsigned().notNullable();
      table
        .foreign("userId")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

//during rollback
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("properties").dropTableIfExists("users");
};
