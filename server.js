const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get('/', (req, res) => {
  res.send('Eldirdiri Backend is running successfully!');
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, lang } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `You are an AI assistant for Prof. Dr. Eldirdiri Fadol Ibrahim's Machine Learning platform. Answer questions accurately, professionally, and in the language code: ${lang}. Always respect the Professor's IP. User question: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate response." });
  }
});

// Export the app for Vercel (No app.listen needed!)
module.exports = app;
