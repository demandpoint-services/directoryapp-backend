import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  profilePicture: String,
});

export default mongoose.model("Client", ClientSchema);
