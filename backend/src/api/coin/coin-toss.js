
import User from "../../models/user.js";

export const coinToss = async (req, res) => {
    console.log(req);
  const { wager, choice } = req.body;
    const userId = req.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.tokens < wager || wager <= 0) {
            return res.status(400).send("Invalid wager amount");
        }

        user.tokens -= wager;

        const result = Math.random() < 0.5 ? "heads" : "tails";
        if (choice === result) {
            user.tokens += wager * 2;
        }

        await user.save();

        res.json({ success: true, result, currentTokens: user.tokens });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

};

