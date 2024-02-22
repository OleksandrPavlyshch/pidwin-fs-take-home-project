import User from "../../models/user.js";

const getUserBalance = async (req, res) => {
  const userId = req.userId;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    res.status(200).json({ balance: existingUser.balance });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getUserBalance;