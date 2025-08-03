//imports
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const connectdb = require("./connectdb/connectdb");
const authroutes = require("./routes/Auth.routes");
const userroutes = require("./routes/User.routes");
const taskroutes = require("./routes/Taks.routes");

//app initiazed
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieparser());

//db connect
connectdb();

//port
const PORT = 5000;

//port
app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/task", taskroutes);

//server
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} `);
});
