const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MONGODB connected");
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = connectdb;
