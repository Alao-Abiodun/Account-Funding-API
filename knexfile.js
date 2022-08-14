// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 * 
 
 */

require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      port: process.env.dbPort || 3306,
    },
  },
  production: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      port: process.env.dbPort,
    },
  },
  testing: {
    client: "mysql",
    version: "5.7",
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUser,
      password: process.env.dbPass,
      database: process.env.dbName,
      port: process.env.dbPort || 3306,
    },
  },
};
