const knex = require('../database/db');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (req, res) => {
    try {
        await knex.schema.hasTable("account").then(async (exists) => {
          if (!exists) {
            await knex.schema
              .createTable("account", async (table) => {
                table.increments("id");
                table.string("type").notNullable();
                table.string("number").notNullable();
                // create decimal field for balance with default value 0.00
                table.decimal("balance", 10, 2).defaultTo(0.00);
                table.integer("user_id").unsigned().references("user.id").notNullable();
                table.timestamp("created_at").defaultTo(knex.fn.now());
                table.timestamp("updated_at").defaultTo(knex.fn.now());
              })
              .then(() => {
                console.log("User Account Table created Successfully");
              })
              .catch((err) => console.log(err));
          }
        });
  } catch (error) {
      console.log(error.message);
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = (knex) => knex.schema.dropTable("account");