// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 * 
 
 */

require('dotenv').config();

module.exports = {

  development:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbUser,
      password : process.env.dbPass,
      database : 'account_funding_db',
      port : process.env.dbPort || 3306
    },

  },
  production:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbUser,
      password : process.env.dbPass,
      database : 'account_funding_db'
    }
  },
  testing:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : '127.0.0.1',
      user : process.env.dbUser,
      password : process.env.dbPass,
      database : 'account_funding_db'
    }
  }

};
