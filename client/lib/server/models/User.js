import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
