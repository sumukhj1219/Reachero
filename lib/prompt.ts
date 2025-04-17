import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDNDD4tOw1y2malT_QrWnqZ7qMimAKYop4";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.8,
    topP: 0.9,
    topK: 40,
    maxOutputTokens: 1024,
  },
});


const generateGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return "⚠️ Failed to generate response.";
  }
};

export default generateGeminiResponse;
