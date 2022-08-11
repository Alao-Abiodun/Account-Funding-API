const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.LENDSQR_ACCESS_TOKEN_SECRET;

module.exports = {
  signAccessToken: (data) => {
    const payload = data;
    const options = {
      expiresIn: process.env.LENDSQR_ACCESS_TOKEN_SECRET_EXPIRES_IN,
      // issuer: 'payercoins',
      // audience: '', // TODO: add audience and issuer
    };
    const token = JWT.sign(payload, secret, options);
    return token;
  },
  verifyAccessToken: (token) => {
    console.log(token, 'TOKEN')
    console.log('PAYLOAD SECRET => ', secret)
    const payload = JWT.verify(token, secret);
    console.log(payload);
    return payload;
  },
};
