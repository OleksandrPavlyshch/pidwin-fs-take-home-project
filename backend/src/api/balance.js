import User from "../models/user.js";

const getUserTokens = async (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthenticated" });
  }
  const userId = req.userId;

  try {
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    res.status(200).json({ tokens: existingUser.tokens });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getUserTokens;