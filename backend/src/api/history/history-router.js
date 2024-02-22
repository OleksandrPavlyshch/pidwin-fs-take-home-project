import express from "express";
import getUserHistory from "./history.js";
import auth from "../../utils/auth.js";

const router = express.Router();

router.get("/", auth, getUserHistory);

export default router;
