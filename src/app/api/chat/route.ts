import { NextRequest, NextResponse } from "next/server";
import Settings from "../../../../model/setting.model";
import { GoogleGenAI } from "@google/genai";
import connectDB from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      const response = NextResponse.json(
        { message: "Message and ownerId are required" },
        { status: 400 }
      );

      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");

      return response;
    }

    const setting = await Settings.findOne({ ownerId }).lean();

    if (!setting) {
      const response = NextResponse.json(
        { message: "Chat bot is not configured for this user" },
        { status: 400 }
      );

      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");

      return response;
    }

    const KNOWLEDGE = `
Business Name: ${setting.businessName || "not provided"}
Support Email: ${setting.supportEmail || "not provided"}
Description: ${setting.knowledge || "not provided"}
`;

    const prompt = `
You are a professional customer support assistant.

Use ONLY the information provided below.

BUSINESS INFORMATION:
${KNOWLEDGE}

CUSTOMER QUESTION:
${message}

ANSWER:
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const response = NextResponse.json({
      reply: result.text,
    });

    // CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;

  } catch (error) {
    console.error(error);

    const response = NextResponse.json(
      { message: `Chat error: ${error}` },
      { status: 500 }
    );

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  }
}

export const OPTIONS=async()=>{
  return NextResponse.json(null,{
    status:200,
    headers:{
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"POST, OPTIONS",
      "Access-Control-Allow-Headers":"Content-Type"
    }
  })
}