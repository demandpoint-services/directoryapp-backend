// routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // Import the Admin model

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Check if the admin already exists
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new admin
  const newAdmin = new Admin({
    username,
    password: hashedPassword,
  });

  try {
    await newAdmin.save();
    return res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error creating admin" });
  }
});

// Signin Route
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  // Check if the admin exists
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  // Check if the password matches
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return res.status(200).json({ token });
});

export default router;
