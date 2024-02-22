import User from "../../models/user.js";
import { getUserHistory } from "../../services/history.js";
import { HISTORY_RECORDS_LIMIT } from "../../constants.js"

const getHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    const historyRecords = await getUserHistory(userId, HISTORY_RECORDS_LIMIT);

    res.status(200).json(historyRecords);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getHistory;