const userServices = require("../services/user.services");
const { successResMsg } = require("../utils/libs/response");

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    const dataInfo = {
      message: "Users retrieved successfully",
      users,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    console.log(error.message);
  }
};

exports.createUserBankAccount = async (req, res) => {
  try {
    const result = await userServices.createUserBankAccount(req.body, req.user);
    const dataInfo = {
      message: "User bank account created successfully",
      result,
    };
    return successResMsg(res, 201, dataInfo);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getUserBankAccount = async (req, res) => {
  try {
    // const { id } = req.params;
    const result = await userServices.getUserBankAccount(req.user);
    const dataInfo = {
      message: "User bank account retrieved successfully",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    console.log(error.message);
  }
};

exports.fundUserAccount = async (req, res, next) => {
  try {
    const result = await userServices.fundUserAccount(
      req.params,
      req.body,
      req.user
    );
    // message if the acount is not found
    if (!result) {
      return next(new AppError("Account Not Found!", 404));
    }
    const dataInfo = {
      message: "User bank account funded successfully",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    console.log(error.message);
  }
};

exports.transferFundsToUserAccount = async (req, res, next) => {
  try {
    const result = await userServices.transferFundsToUserAccount(
      req.params,
      req.body
    );
    console.log("controller test", result);
    const dataInfo = {
      message: "User bank account transferred successfully",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    console.log(error.message);
  }
};

exports.withdrawFunds = async (req, res, next) => {
  try {
    const result = await userServices.withdrawFunds(req.body, req.user);
    // message for withdraw success
    const dataInfo = {
      message: "User bank account withdrawn funds successfully",
      result,
    };
    return successResMsg(res, 200, dataInfo);
  } catch (error) {
    console.log(error.message);
  }
};
