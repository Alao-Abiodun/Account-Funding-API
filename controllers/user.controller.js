const userServices = require('../services/user.services');
const {successResMsg} = require('../utils/libs/response');

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        const dataInfo = {
            message: 'Users retrieved successfully',
            users
        }
        return successResMsg(res, 200, dataInfo);
    } catch (error) {
        console.log(error.message);
    }
}