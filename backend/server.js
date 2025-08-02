const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const connectdb = require("./connectdb/connectdb");

app.use(cors());
app.use(express.json());
app.use(cookieparser());

connectdb();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT} `);
});
