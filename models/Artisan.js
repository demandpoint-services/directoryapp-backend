import mongoose from "mongoose";

const ArtisanSchema = new mongoose.Schema({
  profilePicture: String,
  fullName: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
  },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  specialty: { type: String, required: true },
  experience: { type: Number, required: true },
  nin: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^\d{11}$/.test(v),
      message: (props) => `${props.value} is not a valid NIN.`,
    },
  },
  minPrice: Number,
  maxPrice: Number,
});

export default mongoose.model("Artisan", ArtisanSchema);
