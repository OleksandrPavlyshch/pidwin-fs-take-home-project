import HistoryRecord from "../models/historyRecord.js";


export function getUserHistory(userId, limit = 10) {
  return HistoryRecord.find({ userId }).sort({ 'createdAt': -1 }).limit(limit);
}

export function addHistoryRecord(data) {
  const record = new HistoryRecord(data);
  return record.save();
}

export async function getUserWinAmount(userId, wager) {
  let history = await getUserHistory(userId, 4);

  // If the user wins 5 times in a row, they receive 10x of what they wagered on the 5th toss
  if (history.every(record => record.success) && !history.some(record => record.resetStreak)) {
    return {
      winAmount: wager * 10,
      resetStreak: true,
      streakBonus: 10
    }
  }

  history = history.slice(0, 2)

  // If the user wins 3 times in a row, they receive 3x of what they wagered on the 3rd toss
  if (history.every(record => record.success) && !history.find(record => record.resetStreak)) {
    return {
      winAmount: wager * 3,
      resetStreak: false,
      streakBonus: 3
    }
  }

  return {
    winAmount: wager * 2,
    resetStreak: false,
    streakBonus: false
  }
}