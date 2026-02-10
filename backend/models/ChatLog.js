const mongoose = require("mongoose");

const chatLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    question: String,
    answer: String,
    confidenceScore: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatLog", chatLogSchema);
