import mongoose from "mongoose";
import { CHOICES } from "../constants.js";

const historyRecord = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  wager: {
    type: Number,
    required: true
  },
  choice: {
    type: String,
    enum: [CHOICES.HEADS, CHOICES.TAILS],
    required: true
  },
  success: {
    type: Boolean,
    required: true
  },
  winAmount: {
    type: Number,
    required: true,
    default: 0
  },
  balance: {
    type: Number,
    required: true
  },
  resetStreak: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date
  }
});

export default mongoose.model("HistoryRecord", historyRecord);