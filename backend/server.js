//imports
const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const connectdb = require("./connectdb/connectdb");
const authroutes = require("./routes/Auth.routes");
const userroutes = require("./routes/User.routes");
const taskroutes = require("./routes/Taks.routes");
const errorhandler = require("./middlewares/errorhandling");
//app initiazed
const app = express();

//middleware
app.use(
  cors({
    origin: "https://tasks-track-three.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());

//db connect
connectdb();

//port
const PORT = 6000;

//port
app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/task", taskroutes);

app.use(errorhandler);

//server
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} `);
});
