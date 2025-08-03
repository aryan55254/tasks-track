const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const connectdb = require("./connectdb/connectdb");
const authroutes = require("./routes/Auth.routes");
const userroutes = require("./routes/User.routes");
const taskroutes = require("./routes/Taks.routes");

app.use(cors());
app.use(express.json());
app.use(cookieparser());

connectdb();

const PORT = 5000;

app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);
app.use("/api/task", taskroutes);

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} `);
});
