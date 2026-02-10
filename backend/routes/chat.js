const express = require("express");
const router = express.Router();
const multer = require("multer");

// multer config (memory storage is enough for demo)
const upload = multer({ storage: multer.memoryStorage() });

router.post("/ask", upload.single("file"), async (req, res) => {
  try {
    const question = req.body.question;
    const file = req.file;

    // CASE 1: FILE UPLOAD
    if (file) {
      return res.json({
        answer: `File "${file.originalname}" uploaded successfully. You can now ask questions related to this document.`,
      });
    }

    // CASE 2: TEXT QUESTION
    if (!question) {
      return res.status(400).json({ answer: "No question provided." });
    }

    const q = question.toLowerCase();

    if (q.includes("leave")) {
      return res.json({
        answer:
          "Employees get **20 paid leaves per year**. Leave requests must be approved by the manager.",
      });
    }

    if (q.includes("working")) {
      return res.json({
        answer:
          "Office working hours are **9 AM to 6 PM**, Monday to Friday.",
      });
    }

    if (q.includes("remote")) {
      return res.json({
        answer:
          "Employees can work remotely **2 days per week** with manager approval.",
      });
    }

    // DEFAULT
    return res.json({
      answer:
        "Sorry, I couldn’t find an exact policy. Please ask about leave, working hours, or remote work.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: "Server error" });
  }
});

module.exports = router;
