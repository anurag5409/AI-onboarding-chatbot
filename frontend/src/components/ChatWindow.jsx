import React, { useState, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const API_URL = "http://localhost:5000/api/chat/ask";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const fileRef = useRef(null);

  const sendQuestion = async (question) => {
    if (!question) return;

    setMessages((prev) => [...prev, { type: "user", text: question }]);

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { type: "bot", text: data.answer, feedback: null },
    ]);

    setInput("");
  };

  const toggleFeedback = (index, value) => {
    setMessages((prev) =>
      prev.map((m, i) =>
        i === index
          ? { ...m, feedback: m.feedback === value ? null : value }
          : m
      )
    );
  };

  const handleAttachment = (file) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text: `📎 ${file.name}` },
      {
        type: "bot",
        text: `File "${file.name}" uploaded successfully.`,
        feedback: null,
      },
    ]);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f5f5f5" }}>
      <Paper sx={{ width: 420, height: 600, p: 2, display: "flex", flexDirection: "column" }}>
        <Typography align="center" variant="h6">Onboarding Chatbot</Typography>

        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", my: 1 }}>
          {["Leave Policy", "Working Hours", "Remote Work Policy"].map(q => (
            <Chip key={q} label={q} clickable onClick={() => sendQuestion(q)} />
          ))}
        </Box>

        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {messages.map((m, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Paper sx={{ p: 1, bgcolor: m.type === "user" ? "#e3f2fd" : "#eee" }}>
                {m.text}
              </Paper>

              {m.type === "bot" && (
                <>
                  <IconButton size="small" color={m.feedback === "like" ? "success" : "default"} onClick={() => toggleFeedback(i, "like")}>
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color={m.feedback === "dislike" ? "error" : "default"} onClick={() => toggleFeedback(i, "dislike")}>
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => fileRef.current.click()}>
            <AttachFileIcon />
          </IconButton>
          <input hidden type="file" ref={fileRef} onChange={(e) => handleAttachment(e.target.files[0])} />

          <TextField fullWidth size="small" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => sendQuestion(input)} variant="contained">Send</Button>
        </Box>
      </Paper>
    </Box>
  );
}
