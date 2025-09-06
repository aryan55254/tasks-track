const user = require("../models/User.model");
const authmiddleware = require("../middlewares/auth.middleware");
const userrouter = require("express").Router();
//get user
userrouter.get("/getuser", authmiddleware, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});
module.exports = userrouter;
