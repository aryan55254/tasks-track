const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");
require("dotenv").config();

const authenticateuser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "not authorized" });
      return;
    }
    const jwt_secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwt_secret);
    const user = await UserModel.findById(decoded.userid, "_id Email Username");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "internal server error ", err });
    return;
  }
};

module.exports = authenticateuser;
