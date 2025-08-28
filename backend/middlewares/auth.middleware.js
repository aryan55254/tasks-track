const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

const authenticateuser = async (req, res, next) => {
  try {
    //get token from cookie
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({ message: "not authorized" });
      return;
    }

    const jwt_secret = process.env.JWT_SECRET;
    //verify the token
    const decoded = jwt.verify(token, jwt_secret);
    //find user from db by the userid in payloads of token
    const user = await UserModel.findById(decoded.userId, "_id Email Username");
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
};

module.exports = authenticateuser;
//authentication middleware
