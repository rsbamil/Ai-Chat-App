const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
}

module.exports = connect;
