import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

interface Chat {
  role: "user" | "model";
  parts: string;
}

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

if (!apiKey) {
  throw new Error("NEXT_PUBLIC_API_KEY is not defined in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function run(prompt: string, history: Chat[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat({
    history: history,
    generationConfig: {
      maxOutputTokens: 1000,
    },
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  const output = response.text();

  return output;
}
