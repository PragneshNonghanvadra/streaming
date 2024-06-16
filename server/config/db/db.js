const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("✅Connected to MongoDB!"))
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
      process.exit(1);
    });
}

module.exports = { connectDB };
