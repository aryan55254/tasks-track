const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

const authenticateuser = async (req, res, next) => {
  //get token from cookie
  const token = req.cookies.jwt;
  const refreshToken = req.cookies.refreshjwt;
  const jwt_secret = process.env.JWT_SECRET;
  const REFRESH_SECRET = process.env.REFRESHTOKEN_SECRET;
  if (!token) {
    res.status(401).json({ message: "not authorized" });
    return;
  }
  try {
    //verify the token
    const decoded = jwt.verify(token, jwt_secret);
    //find user from db by the userid in payloads of token
    const user = await UserModel.findById(decoded.userid, "_id Email Username");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    // Attach the authenticated user object to the request object this allows subsequent request to use this
    req.user = user;
    next();
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      //error anything other than expiry, the token is bad
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }

    //token is  EXPIRED. Now we refresh
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Access token expired, no refresh token provided" });
    }
    try {
      //verify the token
      const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
      //find user from db by the userid in payloads of token
      const user = await UserModel.findById(
        decoded.userid,
        "_id Email Username"
      );
      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }
      // Attach the authenticated user object to the request object this allows subsequent request to use this
     req.user = user;
      next();
    } catch (err) {
      res.status(500).json({ message: "internal server error ", err });
      return;
    }
  }
};

module.exports = authenticateuser;
//authentication middleware
