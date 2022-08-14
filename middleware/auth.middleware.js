const { verifyAccessToken } = require("../utils/libs/jwt-helper");
const AppError = require("../utils/libs/appError");
const db = require("../database/db");

// verify the access token
module.exports = {
  isAuthenticated: async (req, res, next) => {
    let token, currentUser;
    // Get token and check if it exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1].toString();
    } else if (req.cookies) {
      token = req.cookies.jwt;
    } else {
      // No token found
      return next(new AppError("Invalid authentication token", 401));
    }
    if (!token) {
      console.log("NOT LOGGED IN");
      return next(
        new AppError("You are not logged in!. Please login to gain access", 401)
      ); // 401 - Unauthorized
    }
    // Token verification
    const decoded = verifyAccessToken(token.toString());

    console.log(decoded, "DECODED TOKEN");

    // Check if user still exists
    currentUser = await db.select("*").from("user").where({ id: decoded.id });

    if (!currentUser) {
      console.log("USER NO LONGER EXIST");
      return next(new AppError("This user no longer exist", 401));
    }
    // Grant user access to route
    req.user = currentUser;

    res.locals.user = currentUser;

    next();
  },
};
