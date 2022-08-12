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

exports.transferFundsToUserAccount = async (paramsData, bodyData, sender) => {
    let senderId = sender.id;
    try {
        const { id } = paramsData;
        const { amountToTransfer } = bodyData;
        const reciever = await db.select('balance').from('user').leftJoin('account', 'user.id', 'account.user_id').where('user.id', id);
        console.log('services test:',reciever);
        reciever[0].balance += parseInt(amountToTransfer);
        await db('account').where('id', id).update({
            balance: reciever[0].balance
        });
        // remove the amount send the from the other user account
        const sender = await db.select('balance').from('user').leftJoin('account', 'user.id', 'account.user_id').where('user.id', senderId);
        console.log("sender:",senderId)
        sender[0].balance -= parseInt(amountToTransfer);
        await db('account').where('id', senderId).update({
            balance: sender[0].balance
        });
        return reciever; 
    } catch (error) {
        console.log(error.message);
    }
}


exports.withdrawFunds = async (data, withdrawal) => {
    const withdrawalId = withdrawal.id;
    try {
        const { amountToWithdraw } = data;
        console.log('amountToWithdraw:',amountToWithdraw);
        const findUserBalance = await await db.select('balance').from('user').leftJoin('account', 'user.id', 'account.user_id').where('user.id', withdrawalId);
        const newBalance = findUserBalance[0].balance - amountToWithdraw;
        await db('account').where('id', withdrawalId).update({
            balance: newBalance
        });
        return parseInt(amountToWithdraw);
    } catch (error) {
        console.log(error.message);
    }
}