const mongoose = require("mongoose");

const knowledgeDocumentSchema = new mongoose.Schema(
  {
    title: String,
    fileType: {
      type: String,
      enum: ["pdf", "markdown"]
    },
    originalFileName: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "KnowledgeDocument",
  knowledgeDocumentSchema
);
