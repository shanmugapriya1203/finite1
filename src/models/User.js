import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  companyName: { type: String, default: null },
  phoneNumber: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, required: true },
  role: { type: String },
  createdAt: { type: Date, default: Date.now },
  userId: { type: Number, unique: true },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  userImage: { type: String, default: null },
  defaultLanguage: { type: String, default: "English" },
  address: { type: String, default: null },
  GST: { type: String, default: null },
  companyLogo: { type: String, default: null },
  verified: { type: Boolean, default: false },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

const User = mongoose.model("User", userSchema);
export default User;
