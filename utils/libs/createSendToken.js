require('dotenv').config();
const {signAccessToken} = require('./jwt-helper');
const {successResMsg} = require('./response');

/**
 * 
 * @param {*} user 
 * @param {*} statusCode 
 * @param {*} res 
 * @returns 
 */

const createSendToken = (user, statusCode, res) => {
    const token = signAccessToken({
      id: user.id,
      email: user.email,
    });
  
    const cookieOptions = {
      expires: new Date(
        Date.now() +
          process.env.LENDSQR_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    };
  
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  
    user.password = undefined;
  
    res.cookie("jwt", token, cookieOptions);
  
    const dataInfo = { token, user };
    return successResMsg(res, 200, dataInfo);
  };

  module.exports = {
    createSendToken,
    };