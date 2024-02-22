import express from "express";
import { coinToss } from "./coin-toss.js";
import auth from "../../utils/auth.js";

const router = express.Router();

router.post("/toss", auth, coinToss);

export default router;