const BCRYPT = require('bcryptjs');

const SALT_ROUNDS = 10;

module.exports = {
    hashPassword:  (data) => {
        return BCRYPT.hash(data, SALT_ROUNDS);
    },

    comparePassword: (data, hash) => {
        return BCRYPT.compare(data, hash);
    }
  };
  
