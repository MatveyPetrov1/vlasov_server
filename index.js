const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { applicationController, videoController } = require("./controller.js");
const validation = require("./validation.js");

const app = express();

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());

const start = async () => {
  app.post("/", validation, applicationController);
  app.get("/video/:fileName", videoController);

  app.listen(PORT, () => {
    console.log("Server is started");
  });
};

start();
