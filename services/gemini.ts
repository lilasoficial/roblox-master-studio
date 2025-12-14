import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateText = async (prompt: string, systemInstruction?: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please check your configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful assistant for Roblox game development.",
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with AI service.";
  }
};

export const generateLuaScript = async (description: string): Promise<string> => {
  const systemInstruction = `You are an expert Roblox Lua scripter. 
  Generate clean, optimized, and well-commented Lua code for Roblox. 
  Do not include markdown code block syntax like \`\`\`lua. Just return the raw code.
  Focus on best practices (Maid pattern, event handling, memory management).`;
  
  return generateText(description, systemInstruction);
};

export const analyzeScript = async (code: string): Promise<string> => {
    const systemInstruction = `You are a Roblox Lua code analyzer. 
    Review the provided code for errors, performance issues, and bad practices. 
    Provide a bulleted list of improvements and then the corrected code.`;
    return generateText(`Analyze this script:\n${code}`, systemInstruction);
};

export const generateGameIdeas = async (genre: string, lang: 'en' | 'pt'): Promise<string> => {
    const systemInstruction = `You are a creative game designer. Suggest 3 unique Roblox game concepts based on the provided genre. 
    Language: ${lang === 'pt' ? 'Portuguese' : 'English'}.
    Format: JSON Array of objects with 'title', 'description', 'mechanics' properties. Return ONLY the JSON string.`;
    
    return generateText(`Genre: ${genre}`, systemInstruction);
};