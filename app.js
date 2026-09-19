const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./db")

const route= require("./routes/route")
const cors = require("cors");
app.set("view engine", "ejs");
app.use(cors());
connectDB()
app.use(express.json())
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(route)


app.listen(3000, () => {
  console.log("you are running on port 3000");
});