const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set("useCreateIndex", true);

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection is open");
});

db.on("error", (err) => {
  console.log(`Mongoose default connection has occured \n${err}`);
});

db.on("disconnected", () => {
  console.log("Mongoose default connection is disconnected");
});

process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "Mongoose default connection is disconnected due application termination"
    );
    process.exit(0);
  });
});

// Load Models
const Users = require("./models/user.model");

// Load Routes
const login = require("./routes/authenticate.routes");
app.use("/v1/auth", login);

const users = require("./routes/users.routes");
app.use("/v1/users", users);


module.exports = app;
