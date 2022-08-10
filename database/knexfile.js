// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 * 
 
 */

require('dotenv').config();

const { HOST, DB_PORT, USER, PASSWORD, DATABASE } = process.env;

module.exports = {

  development: {
  client: 'mysql',
  connection: {
    host : HOST,
    port : DB_PORT,
    user : USER,
    password : PASSWORD,
    database : DATABASE,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {

  }
  },

  staging: {
    client: 'mysql',
    connection: {
      host : HOST,
      port : DB_PORT,
      user : USER,
      password : PASSWORD,
      database : DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host : HOST,
      port : DB_PORT,
      user : USER,
      password : PASSWORD,
      database : DATABASE,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
