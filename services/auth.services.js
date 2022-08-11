const knex = require('../database/db');

// create user account with data as a parameter
exports.createUser = async (data) => {
    try {
       const user =  await knex('user').insert(data);
       return user;
    } catch (error) {
        console.log(error.message);
    }
}


// create a login with data as a parameter
exports.login = async (data) => {
    try {
        await knex('login').insert(data).then(() => {
            console.log("user login Successfully");
        }).catch((err) => console.log(err));
    } catch (error) {
        console.log(error.message);
    }
}