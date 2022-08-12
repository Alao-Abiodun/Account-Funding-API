const {verifyAccessToken} = require('../utils/libs/jwt-helper');
const AppError = require('../utils/libs/appError');


// verify the access token
module.exports = {
    isAuthenticated: async (req, res, next) => {
        const accessToken = req.headers.authorization.split(" ")[1].toString()
        if (!accessToken) {
            return next(new AppError('Please provide an access token', 401));
        }
        const decoded = await verifyAccessToken(accessToken);
        console.log(decoded, 'decoded');
        if (!decoded) {
            return next(new AppError('Invalid access token', 401));
        }
        req.user = decoded;
        next();
    }
}