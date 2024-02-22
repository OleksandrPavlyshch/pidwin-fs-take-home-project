import express from "express";
import getUserBalance from "./balance.js";
import auth from "../../utils/auth.js";

const router = express.Router();

router.get("/", auth, getUserBalance);

export default router;
