const db = require('../database/db');

// get all users
exports.getAllUsers = async () => {
    try {
        const users = await db('user').select('*');
        return users;
    } catch (error) {
        console.log(error.message);
    }
}

// create user account with data as a parameter
exports.createUserBankAccount = async (data) => {
    try {
        if (!data.type || !data.number || !data.user_id) {
            throw new AppError('Please provide all required fields', 400);
        }
        const userBankAccount = await db('account').insert({
            type: data.type,
            number: data.number,
            balance: data.balance,
            user_id: data.user_id
        });
        return userBankAccount;
    } catch (error) {
        
    }
}

// fetch user bank account information
exports.getUserBankAccount = async (data) => {
    try {
        const { id } = data
        const userBankAccount = await db.select('name', 'email', 'type', 'balance',).from('user').leftJoin('account', 'user.id', 'account.user_id').where('user.id', id);
        return userBankAccount;
    } catch (error) {
        console.log(error.message);
    }
}

// fund user account balance
exports.fundUserAccount = async (paramsData, bodyData) => {
    try {
        const { id } = paramsData;
        const { amountToFund } = bodyData;
        // update account balance field with amountToFund
        const result = await db('account').where('id', id).update({
            balance: amountToFund
        });
        return result;
    } catch (error) {
        console.log(error.message);
    }
}
