const userServices = require('../services/user.services');

// get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userServices.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
}