import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./src/api/user/user-router.js";
import coinRouter from "./src/api/coin/coin-router.js";
import balanceRouter from "./src/api/balance/balance-router.js";
import historyRouter from "./src/api/history/history-router.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/coin", coinRouter);
app.use("/api/balance", balanceRouter);
app.use("/api/history", historyRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
})

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
