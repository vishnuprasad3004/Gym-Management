import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWorkoutPlan = async (memberProfile: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are an expert fitness coach. Create a concise, personalized weekly workout plan for a gym member with the following profile:
      "${memberProfile}"
      
      Output format:
      - Brief analysis of goals
      - 3-4 bullet points for key focus areas
      - A simple Mon-Sun schedule
      Keep it encouraging and professional. Do not use markdown bolding excessively, keep it clean text.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Unable to generate plan at this time.";
  } catch (error) {
    console.error("Error generating workout plan:", error);
    return "Error communicating with AI service. Please check your API key.";
  }
};

export const chatWithGymAssistant = async (message: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: "You are 'FitNexus AI', a helpful gym management assistant. You help gym owners analyze trends, suggest marketing ideas, and solve operational problems. Keep answers concise and business-oriented.",
      },
      history: history.map(h => ({ role: h.role, parts: h.parts })),
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I didn't catch that.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "I'm having trouble connecting right now.";
  }
};