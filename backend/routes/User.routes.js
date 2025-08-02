const user = require("../models/User.model");
const authmiddleware = require("../middlewares/auth.middleware");
const userrouter = require("express").Router();

userrouter.get("/getuser", authmiddleware, async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ message: "internal server error :" }, err);
  }
});
module.exports = userrouter;
