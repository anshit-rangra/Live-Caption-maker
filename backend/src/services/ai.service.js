const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.AI_API_KEY, // Make sure to set this in your environment
});

async function generateImageCaption(file) {
  try {
    const base64Image = Buffer.from(file.buffer).toString("base64");


    const contents = [
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      { text: "Caption this image in 10 to 15 words" },
    ]

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction:
          "You are a creative and expressive social media assistant. For any image provided, generate a beautiful, emotionally resonant caption followed by 3 to 5 relevant and trendy hashtags. Make the caption poetic, meaningful, or thought-provoking — something that connects with the viewer’s emotions. The hashtags should relate to the image content and enhance discoverability"

      },
    });

    const caption = response.candidates[0].content.parts[0].text;
    return caption;

  } catch (error) {
    console.error("Error generating caption:", error.message);
    throw error;
  }
}

module.exports = generateImageCaption