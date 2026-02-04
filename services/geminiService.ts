import { GoogleGenAI, Type } from "@google/genai";
import { ContentStrategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGrowthStrategy = async (topic: string): Promise<ContentStrategy | null> => {
  if (!topic) return null;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Создай 3-шаговую воронку контент-маркетинга для ниши: "${topic}".
      Цель - перевести пользователя из соцсетей (холодный трафик) в подписчики Telegram-канала.
      
      Шаг 1: Вирусный хук для широкого охвата (Reels/Shorts/TikTok).
      Шаг 2: Экспертный пост для прогрева (Telegram/LinkedIn/vc.ru).
      Шаг 3: Эксклюзивная ценность (Лид-магнит) внутри Telegram-канала.
      
      Стиль: дерзкий, конкретный, без воды. Используй "ты", будь краток.
      Язык ответа: Русский.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            niche: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  platform: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ["platform", "title", "description"],
              },
            },
          },
          required: ["niche", "steps"],
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text) as ContentStrategy;
    }
    return null;
  } catch (error) {
    console.error("Error generating strategy:", error);
    throw error;
  }
};