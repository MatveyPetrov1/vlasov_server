const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const applicationController = require("./controller.js");
const validation = require("./validation.js");

const app = express();

const PORT = process.env.PORT || 4444;
const dbUrl = process.env.DB_URL;

app.use(express.json());
app.use(cors());

const start = async () => {
  await mongoose
    .connect(dbUrl)
    .then(() => console.log("DB is started"))
    .catch((err) => console.log(err));

  app.post("/", validation, applicationController);

  app.listen(PORT, () => {
    console.log("Server is started");
  });
};

start();
