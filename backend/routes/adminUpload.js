const express = require("express");
const multer = require("multer");
const fs = require("fs");
const KnowledgeChunk = require("../models/KnowledgeChunk");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const content = fs.readFileSync(req.file.path, "utf-8");

    // 🔥 DELETE OLD CHUNKS
    await KnowledgeChunk.deleteMany({});

    // 🔥 SPLIT MARKDOWN BY SECTIONS
    const sections = content
      .split("##")
      .map(s => s.trim())
      .filter(Boolean);

    let count = 0;

    for (const section of sections) {
      await KnowledgeChunk.create({
        content: section
      });
      count++;
    }

    fs.unlinkSync(req.file.path);

    res.json({
      message: "Document uploaded and indexed successfully",
      chunksCreated: count
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
