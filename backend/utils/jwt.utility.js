const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const generatejwt = (res, userid) => {
  const token = jwt.sign({ userid }, jwt_secret, { expiresIn: "1h" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge: 3600000,
    path: "/",
  });
};
const clearjwt = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
};

module.exports = { generatejwt, clearjwt };
