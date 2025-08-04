const bcrypt = require("bcryptjs");
const user = require("../models/User.model");
const { generatejwt, clearjwt } = require("../utils/jwt.utility");
const authrouter = require("express").Router();
//register route
authrouter.post("/register", async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    if (!Username || !Email || !Password) {
      res.status(400).json({ message: "missing credentials" });
      return;
    }
    const existingemail = await user.findOne({ Email });
    if (existingemail) {
      res
        .status(400)
        .json({ message: "account with this email already exists" });
      return;
    }
    const hashedpassword = await bcrypt.hash(Password, 10);

    const newuser = new user({
      Username,
      Email,
      Password: hashedpassword,
    });
    await newuser.save();
    res.status(200).json({ message: "user succesfuly registered" });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});
//login route
authrouter.post("/login", async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(400).json({ message: "missing credentials" });
      return;
    }
    const checkemail = await user.findOne({ Email });

    if (!checkemail) {
      res.status(404).json({ message: "user not found " });
      return;
    }
    const checkpassword = await bcrypt.compare(Password, checkemail.Password);
    if (!checkpassword) {
      res.status(400).json({ message: "incorrect password" });
      return;
    }
    generatejwt(res, checkemail._id);
    res.status(200).json({ message: "login succesfull" });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});
//login route
authrouter.post("/logout", async (req, res) => {
  try {
    clearjwt(res);
    res.status(200).json({ message: "logout succesful" });
  } catch (err) {
    res.status(500).json({ message: "internal server error : ", err });
  }
});
module.exports = authrouter;
