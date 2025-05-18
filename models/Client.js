import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  profilePicture: String,
  nin: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^\d{11}$/.test(v),
      message: (props) => `${props.value} is not a valid NIN.`,
    },
  },
});

export default mongoose.model("Client", ClientSchema);
