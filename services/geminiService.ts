import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AiStrategyResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGrowthStrategy = async (niche: string): Promise<AiStrategyResponse> => {
  
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      headline: {
        type: Type.STRING,
        description: "Un titular de alto impacto para la landing page.",
      },
      keyPoints: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 puntos clave de valor para convencer al usuario.",
      },
      callToAction: {
        type: Type.STRING,
        description: "Un texto persuasivo para el botón de acción.",
      }
    },
    required: ["headline", "keyPoints", "callToAction"],
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Actúa como un consultor experto en Growth Hacking y Landing Pages. 
      El usuario quiere crear un sitio web para el nicho: "${niche}".
      Genera una estructura estratégica persuasiva, corta y directa.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        systemInstruction: "Eres un estratega digital senior de la agencia KN Growth. Tu tono es profesional, minimalista y directo al grano.",
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AiStrategyResponse;
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
};