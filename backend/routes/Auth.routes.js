const bcrypt = require("bcryptjs");
const user = require("../models/User.model");
const { generatejwt, clearjwt } = require("../utils/jwt.utility");
const authrouter = require("express").Router();
const {
  registerschema,
  loginSchema,
} = require("../validation_schema/auth.validation");
const validate = require("../middlewares/validate.middleware");
//register route
authrouter.post(
  "/register",
  validate(registerschema),
  async (req, res, next) => {
    try {
      const { Username, Email, Password } = req.body;

      const existingemail = await user.findOne({ Email });
      if (existingemail) {
        return res
          .status(409)
          .json({ message: "Account with this email already exists" });
      }

      const hashedpassword = await bcrypt.hash(Password, 10);

      const newuser = new user({
        Username,
        Email,
        Password: hashedpassword,
      });
      await newuser.save();

      res.status(201).json({ message: "User successfully registered" });
    } catch (err) {
      // For any unexpected errors (like DB connection issues)
      next(err);
    }
  }
);
//login route
authrouter.post("/login", validate(loginSchema), async (req, res, next) => {
  console.log("LOGIN ATTEMPT RECEIVED WITH BODY:", req.body);

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
      res.status(401).json({ message: "incorrect password" });
      return;
    }
    generatejwt(res, checkemail._id);
    const { Password: _, ...userData } = checkemail.toObject();
    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
});
//logout route
authrouter.post("/logout", async (req, res, next) => {
  try {
    clearjwt(res);
    res.status(200).json({ message: "logout succesful" });
  } catch (err) {
    next(err);
  }
});
module.exports = authrouter;
