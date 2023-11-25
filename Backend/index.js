const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { connection } = require("./databaseConnection");
const { userRouter } = require("./routes/userRouter");
const { projectRouter } = require("./routes/projectRouter");
const { fileRouter } = require("./routes/fileRouter");
const { authMiddleware } = require("./middleware/AuthMiddleware");
require("dotenv").config();
const app = express();
const PORT = 7070;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is up and running!" });
});

app.use("/user", userRouter);
app.use(authMiddleware);
app.use("/project", projectRouter);
app.use("/file", fileRouter);
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database sussessfully.");
  } catch (error) {
    console.log("error :", error);
  }
  console.log(`Server running on port ${PORT}`);
});
