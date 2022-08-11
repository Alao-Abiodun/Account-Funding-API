const knex = require('../database/db');

// get all users
exports.getAllUsers = async () => {
    try {
        const users = await knex('user').select('*');
        return users;
    } catch (error) {
        console.log(error.message);
    }
}
