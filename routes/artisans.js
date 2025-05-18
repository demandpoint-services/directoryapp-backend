import express from "express";
import Artisan from "../models/Artisan.js";

const router = express.Router();

// ✅ Register Artisan
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      state,
      city,
      specialty,
      experience,
      profilePicture,
      nin,
    } = req.body;

    const artisan = new Artisan({
      fullName,
      phone,
      email,
      state,
      city,
      specialty,
      experience,
      profilePicture,
      nin,
    });

    await artisan.save();
    res
      .status(201)
      .json({ message: "Artisan registered successfully", artisan });
  } catch (error) {
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ error: "Registration failed", details: error.message });
  }
});

// ✅ GET All Artisans
router.get("/", async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.status(200).json(artisans);
  } catch (error) {
    console.error("Fetch Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch artisans", details: error.message });
  }
});

// ✅ PATCH: Update Artisan Status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "declined"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const updatedArtisan = await Artisan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedArtisan) {
      return res.status(404).json({ error: "Artisan not found" });
    }

    res
      .status(200)
      .json({ message: "Status updated", artisan: updatedArtisan });
  } catch (error) {
    console.error("Status Update Error:", error);
    res
      .status(500)
      .json({ error: "Failed to update status", details: error.message });
  }
});

export default router;
