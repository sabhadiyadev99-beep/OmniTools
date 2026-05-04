import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

export function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateContent(prompt: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function generateStructuredContent(prompt: string, schema: any, maxTokens: number = 4096) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Using the latest stable model
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        maxOutputTokens: maxTokens, 
      },
    });
    
    const text = response.text || "[]";
    try {
      // Direct parse attempt
      return JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error. Attempting advanced cleaning...", text.substring(0, 200) + "...");
      
      try {
        // Attempt to extract the first valid JSON object or array
        const startIdx = text.search(/[\[\{]/);
        if (startIdx === -1) throw new Error("No JSON structure found");

        const firstChar = text[startIdx];
        const lastChar = firstChar === "{" ? "}" : "]";
        let endIdx = text.lastIndexOf(lastChar);

        if (endIdx > startIdx) {
          let possibleJson = text.substring(startIdx, endIdx + 1);
          
          // Try to fix common truncation issues like missing closing quotes or braces
          try {
            return JSON.parse(possibleJson);
          } catch (e) {
            // Attempt to close open structures if truncated
            let depth = 0;
            let inString = false;
            let lastValidIndex = -1;

            for (let i = startIdx; i < text.length; i++) {
              const char = text[i];
              if (char === '"' && text[i - 1] !== '\\') inString = !inString;
              if (!inString) {
                if (char === "{" || char === "[") depth++;
                if (char === "}" || char === "]") depth--;
              }
              if (depth === 0 && !inString) {
                lastValidIndex = i;
                break;
              }
            }

            if (lastValidIndex !== -1) {
              return JSON.parse(text.substring(startIdx, lastValidIndex + 1));
            }
            throw e;
          }
        }
      } catch (innerError) {
        console.error("Advanced cleaning failed:", innerError);
      }
      
      throw parseError;
    }
  } catch (error) {
    console.error("Gemini Structured Error:", error);
    throw error;
  }
}

export { Type };

