# AI Onboarding Chatbot

AI-powered onboarding chatbot to help new employees quickly understand company policies, FAQs, and internal documents through a conversational interface.

This project uses a MERN-based architecture with document upload, full-text search, feedback tracking, and a modern chat UI.

---

## Features

- Chat-based interface for company policy queries
- Quick reply buttons for common questions
- File attachment upload support
- MongoDB full-text search on uploaded documents
- Stores chat history and user feedback
- Admin API for uploading knowledge documents
- Clean and responsive UI using Material UI

---

## Tech Stack

Frontend:
- React.js
- Material UI

Backend:
- Node.js
- Express.js
- Multer (file uploads)

Database:
- MongoDB Atlas
- Full-text search indexing

---

## How It Works

1. Admin uploads company documents (policies, FAQs)
2. Documents are stored and indexed in MongoDB
3. Users interact with the chatbot via UI
4. Queries are matched against indexed content
5. Relevant answers are returned instantly
6. Users can provide like/dislike feedback on responses

---

## Environment Variables

Backend requires a `.env` file with:

MONGO_URI=your_mongodb_connection_string
PORT=5000


---

## Notes

- `node_modules` and `.env` files are ignored from Git
- Uploaded files are handled via backend upload API
- AI model integration can be added later if needed
- Designed to work without OpenAI dependency

---

## Use Case

- Employee onboarding
- Internal HR policy assistant
- Knowledge base chatbot
- Company documentation assistant

---

## Author

Anurag Singh  
