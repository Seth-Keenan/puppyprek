
import { GoogleGenAI } from "@google/genai";

export const getTrainingAdvice = async (question: string, history: {role: 'user' | 'model', parts: {text: string}[]}[]) => {
  try {
    // Safety check for API key presence
    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
    if (!apiKey) {
      throw new Error("API Key is missing from environment");
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: question }] }
      ],
      config: {
        systemInstruction: "You are Jet, a world-class dog training expert. Your tone is encouraging, professional, and knowledgeable. You specialize in positive reinforcement and puppy development. Keep answers concise but actionable.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble thinking right now. Please try again later!";
  }
};
