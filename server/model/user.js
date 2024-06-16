const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
    enum: ["user", "admin"],
  },
  createdTime: { type: Date, default: Date.now },
});

const User = Mongoose.model("user", UserSchema);

module.exports = User;
