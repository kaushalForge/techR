const mongoose = require("mongoose");

const URI = process.env.URI;
const databaseConnection = async () => {
  try {
    await mongoose.connect(URI, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log("MongoDB Connection successful for user-model");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
databaseConnection();

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("user", userSchema);
