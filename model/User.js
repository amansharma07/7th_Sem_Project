const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  password: { type: String, required: true },
  v_type: { type: String, required: true },
});

module.exports = mongoose.model("users", userSchema);
