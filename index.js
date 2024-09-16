const express = require("express");
require("dotenv").config();
const cors = require("cors");

const {
  applicationController,
  videoController,
  imageController,
} = require("./controller.js");

const app = express();

const PORT = process.env.PORT || 4444;

app.use(express.json());
app.use(cors());

const start = async () => {
  app.post("/", applicationController);
  app.get("/videos/:fileName", videoController);
  app.get("/images/:fileName", imageController);

  app.listen(PORT, () => {
    console.log("Server is started");
  });
};

start();
