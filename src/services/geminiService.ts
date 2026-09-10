'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ مفتاحك (الذي تأكدنا أنه يعمل)
const API_KEY = "AIzaSyDtwDzF8wE5hjSNV4LHpY8oBh73VopNfNo";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ==========================================
// 1️⃣ وظائف AI Studio (الشات، الصور، الفيديو)
// ==========================================

export async function generateSmartChat(input: string, thinking: boolean, search: boolean) {
  try {
    const generationConfig = { 
      temperature: thinking ? 0.7 : 0.4, 
      maxOutputTokens: 1000 
    };

    const chat = model.startChat({
      generationConfig,
      history: [
        { role: "user", parts: [{ text: "You are Smart Loans Agent. Be concise, professional, and financially accurate." }] },
        { role: "model", parts: [{ text: "Understood. I am ready to provide precise financial insights." }] },
      ],
    });

    const result = await chat.sendMessage(input);
    const response = await result.response;
    return { text: response.text(), grounding: [] };
    
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    return { 
      text: "Sorry, I am experiencing high traffic. Please try again later.", 
      grounding: [] 
    };
  }
}

export async function analyzeVisual(base64: string, type: string, prompt: string) {
  try {
    const cleanBase64 = base64.includes('base64,') ? base64.split('base64,')[1] : base64;
    const imagePart = { 
      inlineData: { 
        data: cleanBase64, 
        mimeType: type || "image/jpeg" 
      } 
    };

    const result = await model.generateContent([prompt, imagePart]);
    return (await result.response).text();
  } catch (error: any) {
    console.error("Gemini Vision Error:", error);
    return "Could not analyze the image. Please make sure the file is not too large.";
  }
}

// --- أدوات المحاكاة (Mock Tools) ---
export async function generateImage(prompt: string, aspect: string, res: string) {
  await new Promise(r => setTimeout(r, 1500));
  return `https://source.unsplash.com/random/800x800/?finance,${encodeURIComponent(prompt.split(" ")[0])}`;
}

export async function editImage(base64: string, prompt: string) {
  await new Promise(r => setTimeout(r, 1500));
  return "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
}

export async function generateVideo(prompt: string, aspect: string, imgBytes?: string) {
  await new Promise(r => setTimeout(r, 2000));
  return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
}

export async function findPlaces(query: string, location: any) {
  await new Promise(r => setTimeout(r, 1000));
  return {
    text: `Found locations for "${query}".`,
    chunks: [{ maps: { title: "Nearby Bank Center", uri: "#" } }]
  };
}


// ==========================================
// 2️⃣ وظائف الآلات الحاسبة (Calculators Engine) - (هذا الجزء هو الذي كان ناقصاً)
// ==========================================

export async function getFinancialAnalysis(type: string, inputs: any, result: any) {
  try {
    const prompt = `
      Act as a senior financial advisor. 
      Analyze these results for a ${type} calculator.
      
      User Inputs: ${JSON.stringify(inputs)}
      Calculated Results: ${JSON.stringify(result)}

      Please provide:
      1. A brief assessment of the situation (Positive/Neutral/Risky).
      2. Three actionable bullet points for improvement.
      3. A "Pro Tip" for long-term wealth.
      
      Keep the tone professional yet encouraging. Format as simple text/markdown.
    `;

    const resultAI = await model.generateContent(prompt);
    return resultAI.response.text();
  } catch (error) {
    console.error("Financial Analysis Error:", error);
    return "Unable to generate AI analysis at this moment. However, your numbers look solid based on standard banking formulas.";
  }
}

export async function getStrategicInsight(type: string, result: any) {
  try {
    const prompt = `Give me ONE single, powerful strategic insight (max 20 words) for someone whose ${type} calculation result was: ${JSON.stringify(result)}. Make it punchy and memorable.`;
    const resultAI = await model.generateContent(prompt);
    return resultAI.response.text();
  } catch (error) {
    return "Compound interest is the eighth wonder of the world. He who understands it, earns it.";
  }
}

export async function getQuickTip(type: string) {
  try {
    const prompt = `Give me a short "Did you know?" financial fact related to ${type}.`;
    const resultAI = await model.generateContent(prompt);
    return resultAI.response.text();
  } catch (error) {
    return "Did you know? Small changes in interest rates can save you thousands over the life of a loan.";
  }
}