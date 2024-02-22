
import { getUser } from "../../services/users.js";
import { CHOICES } from "../../constants.js";
import { addHistoryRecord, getUserWinAmount } from "../../services/history.js";

export const coinToss = async (req, res) => {
    const { wager, choice } = req.body;
    const userId = req.userId;

    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.balance < wager || wager <= 0) {
            return res.status(400).send("Invalid wager amount");
        }


        user.balance -= wager;

        const result = Math.random() < 0.5 ? CHOICES.HEADS : CHOICES.TAILS;
        const success = choice === result;
        let bonus = false;

        if (success) {
            const { winAmount, resetStreak, streakBonus } = await getUserWinAmount(userId, wager)

            user.balance += winAmount;
            bonus = streakBonus;

            // write win record to the history
            await addHistoryRecord({
                userId,
                wager,
                choice,
                success,
                balance: user.balance,
                winAmount,
                resetStreak,
                createdAt: new Date()
            })
        } else {
            // write lose record to the history
            await addHistoryRecord({
                userId,
                wager,
                choice,
                success: false,
                balance: user.balance,
                winAmount: 0,
                resetStreak: false,
                createdAt: new Date()
            })
        }

        await user.save();

        res.json({ success, result, balance: user.balance, bonus });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

};

