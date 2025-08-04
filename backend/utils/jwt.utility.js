const jwt = require("jsonwebtoken");
require("dotenv").config();
const refresh_secret = process.env.REFRESHTOKEN_SECRET;
const jwt_secret = process.env.JWT_SECRET;
//generate jwt token
const generatejwt = (res, userid) => {
  //sign token with the secret key and put in userid in payloads
  const token = jwt.sign({ userid }, jwt_secret, { expiresIn: "1m" });
  //send the token via cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge:   60 * 1000,
    path: "/",
  });
};
//add a refresh token after the acess token
const refreshjwt = (res, userid) => {
  //sign token with the secret key and put in userid in payloads
  const refreshtoken = jwt.sign({ userid }, refresh_secret, {
    expiresIn: "7d",
  });
  //send the token via cookie
  res.cookie("refreshjwt", refreshtoken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    samesite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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

module.exports = { generatejwt, clearjwt, refreshjwt };
