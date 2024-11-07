import User from "../models/User.js";
import jwt from "jsonwebtoken";
const verifyEmail = async (req, res) => {
  console.log("Verify email route hit"); // This should log if the route is accessed
  try {
    const { token } = req.query;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user and update the `verified` status
    const user = await User.findByIdAndUpdate(userId, { verified: true });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid token or user not found." });
    }

    res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error in email verification:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default verifyEmail;
