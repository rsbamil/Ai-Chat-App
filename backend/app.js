const express = require("express");
const morgan = require("morgan");
const connect = require("./db/db");
const userRoutes = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
connect();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
