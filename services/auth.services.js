const knex = require('../database/db');
const AppError = require('../utils/libs/appError');

// create user account with data as a parameter
exports.createUser = async (data) => {
    try {
        if (!data.name || !data.email || !data.password) {
            throw error;
        }
       const user =  await knex('user').insert(data);
       return user;
    } catch (error) {
        throw new AppError(error.message, 400);
    }
}


// create a login with data as a parameter
exports.login = async (data) => {
    try {
        if (!data.email || !data.password) {
            throw new AppError('Please provide all required fields', 400);
        }
       const user = await knex('user').select('*').where('email', data.email).andWhere('password', data.password);
       return user;
    } catch (error) {
        throw new AppError(error.message, 400);
    }
}