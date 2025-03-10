import express from "express";
import userRouter from "./routes/user.route";
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/user", userRouter);

export default app;
