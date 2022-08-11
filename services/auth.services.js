const knex = require('../database/db');
const AppError = require('../utils/libs/appError');
const {hashPassword, comparePassword} = require('../utils/libs/bcrypt-helper');

// create user account with data as a parameter
exports.createUser = async (data) => {
    try {
        if (!data.name || !data.email || !data.password) {
            throw new AppError('Please provide all required fields', 400);
        }
        // hash the password before inserting into the database
        const hashedPassword = await hashPassword(data.password);
        const user = await knex('user').insert({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });
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
        const user = await knex('user').select('*').where('email', data.email);
        // check if the user exists
        if (!user.length) {
            throw new AppError('User not found', 404);
        }
        const isPasswordValid = await comparePassword(data.password, user[0].password);
        if (!isPasswordValid) {
            throw new AppError('Invalid password', 400);
        }
       return user;
    } catch (error) {
        throw new AppError(error.message, 400);
    }
}