import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

export async function comparePlagarism(descriptionA, descriptionB) {
  const promt = `Compare these two student project descriptions and determine how similar they are in terms of core idea and approach — not just wording.

Description A: "${descriptionA}"

Description B: "${descriptionB}"

Respond ONLY with valid JSON in this exact format, no other text, no markdown formatting:
{"score": <number 0-100>, "reason": "<one sentence explanation>"}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: promt,
    });

    const text = response.text.trim();
    console.log("RAW Gemini response:", text); 

    const cleaned = text.replace(/```json|```/g, "").trim();
    console.log("CLEANED before parse:", cleaned);

    return JSON.parse(cleaned);
  } catch (e) {
    console.error("Plagiarism check FULL error:", e); 
    return { score: 0, reason: "Could not evaluate" };
  }
}