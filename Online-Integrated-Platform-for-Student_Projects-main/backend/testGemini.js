import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const run = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: "say hello!",
    });
    console.log("gemini response:", response.text);
  } catch (e) {
    console.log("gemini error:", e);
  }
};

run();
