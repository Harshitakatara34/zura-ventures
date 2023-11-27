
const express = require("express");

const cors = require("cors");
const { connection } = require("./databaseConnection");
const { UserRouter } = require("./Routes/userRouter");
const { ProjectRouter } = require("./Routes/projectRouter");
const { FileRouter } = require("./Routes/FileRouter");
const { AuthMiddleware } = require("./Middleware/AuthMiddleware");
require("dotenv").config();
const app = express();


app.use(cors());

app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get("/", (req, res) => {
  console.log("done")
  res.send({ message: "Started" });
});
console.log("harshi")
app.use("/user", UserRouter);
app.use(AuthMiddleware);
app.use("/project", ProjectRouter);
app.use("/file", FileRouter);

app.listen(4040, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (error) {
    console.log("error :", error);
  }
  console.log(`Server running`);
});
