const authServices = require('../services/auth.services');

// create user and by calling the userServices function
exports.register = async (req, res) => {
    try {
        const result = await authServices.createUser(req.body);
        res.status(200).json({message: 'User created successfully'});
    } catch (error) {
        console.log(error.message);
    }
}

// create a login and by calling the userServices function
exports.login = async (req, res) => {
    try {
        const result = await authServices.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
    }
}