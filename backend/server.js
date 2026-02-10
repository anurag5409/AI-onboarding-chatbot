require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const chatRoute = require("./routes/chat");
const adminUploadRoute = require("./routes/adminUpload");

const app = express();

/* ✅ BODY PARSING MUST COME FIRST */
app.use(cors());
app.use(express.json());

/* ✅ ROUTES AFTER BODY PARSING */
app.use("/api/chat", chatRoute);
app.use("/api/admin", adminUploadRoute);

app.get("/", (req, res) => {
  res.send("AI Onboarding Chatbot Backend Running");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.error(err));
