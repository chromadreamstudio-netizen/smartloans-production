import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 🔒 التغيير الأمني: قراءة المفتاح من البيئة المخفية فقط
    const API_KEY = process.env.GEMINI_API_KEY;

    // التحقق من وجود المفتاح
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Server Configuration Error: API Key is missing in .env.local" },
        { status: 500 }
      );
    }

    const { context, numbers, userGoal } = await req.json();

    // ---------------------------------------------------------
    // 🕵️ الاستكشاف الذكي (Self-Healing)
    // ---------------------------------------------------------
    console.log("🔍 Auto-detecting best available Gemini model...");
    
    // استخدام المفتاح الآمن في الرابط
    const listModelsUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    const listResponse = await fetch(listModelsUrl);
    
    if (!listResponse.ok) {
        const errorData = await listResponse.json();
        throw new Error(`Google API Error: ${errorData.error?.message || listResponse.statusText}`);
    }
    
    const listData = await listResponse.json();

    // البحث عن الموديل المناسب
    const validModel = listData.models?.find((m: any) => 
      m.name.includes("gemini") && 
      m.supportedGenerationMethods?.includes("generateContent")
    );

    if (!validModel) {
      throw new Error("No compatible Gemini model found for this account.");
    }

    const modelName = validModel.name.replace("models/", "");
    console.log(`✅ Selected Model: ${modelName}`);

    // ---------------------------------------------------------
    // 🚀 التنفيذ
    // ---------------------------------------------------------
    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

    const requestBody = {
      contents: [{
        parts: [{
          text: `You are an elite financial advisor. 
                 User Question: ${userGoal}
                 Context: ${context}
                 Financial Data: ${JSON.stringify(numbers)}
                 
                 Tone: Professional, Concise (max 100 words).`
        }]
      }]
    };

    const response = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: `AI Error: ${data.error?.message}` },
        { status: response.status }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) throw new Error("AI returned empty response.");

    return NextResponse.json({ result: text });

  } catch (error: any) {
    console.error("🔥 Server Error:", error.message);
    return NextResponse.json(
      { error: "System Error: " + error.message },
      { status: 500 }
    );
  }
}