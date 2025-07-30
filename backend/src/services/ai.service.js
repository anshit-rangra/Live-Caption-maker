const { GoogleGenAI } = require("@google/genai")


// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.AI_API_KEY
});

async function aiModel(question) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: question,
  });
  return response;
}

module.exports = aiModel