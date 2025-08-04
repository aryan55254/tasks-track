const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECRET;
//generate jwt token
const generatejwt = (res, userid) => {
  //sign token with the secret key and put in userid in payloads
  const token = jwt.sign({ userid }, jwt_secret, { expiresIn: "50m" });
  //send the token via cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge: 50 * 60 * 1000,
    path: "/",
  });
};
//clear the token from cookie
const clearjwt = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
  res.cookie("refreshjwt", "", {
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });
};

module.exports = { generatejwt, clearjwt};
