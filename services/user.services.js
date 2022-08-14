const db = require("../database/db");
const AppError = require("../utils/libs/appError");
// get all users
exports.getAllUsers = async () => {
  try {
    const users = await db("user").select("*");
    return users;
  } catch (error) {
    console.log(error.message);
  }
};

// create user account with data as a parameter
exports.createUserBankAccount = async (data, authData) => {
  try {
    const { id } = authData;
    if (!data.type || !data.number) {
      throw new AppError("Please provide all required fields", 400);
    }
    const userBankAccount = await db("account").insert({
      type: data.type,
      number: data.number,
      balance: data.balance,
      user_id: id,
    });
    return userBankAccount;
  } catch (error) {
    console.log(error.message);
  }
};

// fetch user bank account information
exports.getUserBankAccount = async (authData) => {
  try {
    const { id } = authData;
    const userBankAccount = await db
      .select("name", "email", "type", "balance")
      .from("user")
      .leftJoin("account", "user.id", "account.user_id")
      .where("user.id", id);
    return userBankAccount;
  } catch (error) {
    console.log(error.message);
  }
};

// fund user account balance
exports.fundUserAccount = async (paramsData, bodyData, authData) => {
  try {
    const { id } = paramsData;
    const { amountToFund } = bodyData;
    let authId = authData.id;
    // find if the account details exist with the id
    const findUserAccount = await db
      .select("balance")
      .from("user")
      .leftJoin("account", "user.id", "account.user_id")
      .where("user.id", authId);
    if (!findUserAccount.length) {
      throw new AppError("Account not found", 404);
    }
    // update account balance field with amountToFund
    const newBalance = findUserAccount[0].balance + parseInt(amountToFund);
    await db("account").where("id", id).update({
      balance: newBalance,
    });
    return newBalance;
  } catch (error) {
    console.log(error.message);
  }
};

exports.transferFundsToUserAccount = async (paramsData, bodyData) => {
  try {
    const { sender_id, reciever_id } = paramsData;
    const { amountToTransfer } = bodyData;
    // get the sender details
    const sender = await db
      .select("balance")
      .from("account")
      .where("id", sender_id);
    // check if the amountToTransfer is greater than the sender balance
    if (amountToTransfer > sender[0].balance) {
      throw new AppError("Insufficient funds", 400);
    }
    // find receiver account by the account id
    const reciever = await db
      .select("balance")
      .from("account")
      .where("id", reciever_id);
    reciever[0].balance += parseInt(amountToTransfer);
    await db("account").where("id", reciever_id).update({
      balance: reciever[0].balance,
    });
    // remove the amount send the from the other user account
    sender[0].balance -= parseInt(amountToTransfer);
    await db("account").where("id", sender_id).update({
      balance: sender[0].balance,
    });
    return reciever;
  } catch (error) {
    console.log(error.message);
  }
};

exports.withdrawFunds = async (bodyData, paramsData) => {
  try {
    const { amountToWithdraw } = bodyData;
    const { id } = paramsData;
    console.log("amountToWithdraw:", amountToWithdraw);
    const findUserBalance = await db
      .select("balance")
      .from("account")
      .where("id", id);
    if (amountToWithdraw > findUserBalance[0].balance) {
      throw new AppError("Insufficient funds", 400);
    }
    const newBalance = findUserBalance[0].balance - amountToWithdraw;
    await db("account").where("id", id).update({
      balance: newBalance,
    });
    return parseInt(amountToWithdraw);
  } catch (error) {
    console.log(error.message);
  }
};
