
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getRacingAdvice(currentSpeed: number, topSpeed: number, carInfo: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an elite racing pit crew chief and social commentator for a speed tracking app. 
      The user is driving a ${carInfo}. 
      Their current speed is ${currentSpeed}. 
      Their daily top speed so far is ${topSpeed}. 
      Provide a short, punchy, 2-sentence commentary. 
      If they are slow, roast them slightly but encourage them. 
      If they are fast, praise their ${carInfo}.
      BE COOL, USE MOTORSPORT SLANG. Keep it under 30 words.`,
      config: {
        temperature: 0.9,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Keep your eyes on the road and both hands on the wheel, racer.";
  }
}
