const mongoose = require("mongoose");

const knowledgeChunkSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KnowledgeDocument"
    },
    content: {
      type: String,
      required: true
    },
    tags: [String]
  },
  { timestamps: true }
);

// 🔍 Full-text search index
knowledgeChunkSchema.index({ content: "text" });

module.exports = mongoose.model(
  "KnowledgeChunk",
  knowledgeChunkSchema
);
