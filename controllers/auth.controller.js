const authServices = require('../services/auth.services');
const {successResMsg} = require('../utils/libs/response');
const {createSendToken} = require('../utils/libs/createSendToken');

// create user and by calling the userServices function
exports.register = async (req, res) => {
    try {
        const result = await authServices.createUser(req.body);
        if (!result) {
            throw new Error('Please provide all required fields');
        }
        const dataInfo = {
            message: 'User created successfully',
        }
        return successResMsg(res, 201, dataInfo);
    } catch (error) {
        console.log(error.message);
    }
}

// create a login and by calling the userServices function
exports.login = async (req, res) => {
    let result;
    try {
        result = await authServices.login(req.body);
        createSendToken(result, 200, res);
    } catch (error) {
        console.log(error.message);
    }
}