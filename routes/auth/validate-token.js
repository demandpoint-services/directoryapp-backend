import express from "express";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/validate-token", protect, async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

export default router;
