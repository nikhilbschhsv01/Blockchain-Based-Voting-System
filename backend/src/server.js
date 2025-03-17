const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routers/auth");
const pollsRouter = require("./routers/polls");
const usersRouter = require("./routers/users");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/polls", pollsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.status(404).send("no link matched!");
});

module.exports = app;
