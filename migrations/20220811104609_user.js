const knex = require('../database/db');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (req, res) => {
    try {
        await knex.schema.hasTable("user").then(async (exists) => {
          if (!exists) {
            await knex.schema
              .createTable("user", async (table) => {
                table.increments("id");
                table.string("name");
                table.string("email");
                table.string("password");
                table.timestamp("created_at").defaultTo(knex.fn.now());
                table.timestamp("updated_at").defaultTo(knex.fn.now());
              })
              .then(() => {
                console.log("User Table created Successfully");
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
 exports.down = (knex) => knex.schema.dropTable("user");
