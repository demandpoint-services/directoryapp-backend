import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// ✅ Register Client
router.post("/register", async (req, res) => {
  try {
    const { fullName, phone, email, state, city, profilePicture, nin } =
      req.body;

    const client = new Client({
      fullName,
      phone,
      email,
      state,
      city,
      profilePicture,
      nin,
    });
    await client.save();

    res.status(201).json({ message: "Client registered successfully", client });
  } catch (error) {
    console.error("Client Registration Error:", error);
    res
      .status(500)
      .json({ error: "Client registration failed", details: error.message });
  }
});

// ✅ Get All Clients (optional)
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

export default router;
