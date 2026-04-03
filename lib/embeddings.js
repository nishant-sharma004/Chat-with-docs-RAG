import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

let embeddingsClient = null;

export function getEmbeddings() {
  if (embeddingsClient) {
    return embeddingsClient;
  }

  embeddingsClient = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    model: "gemini-embedding-001",
  });

  return embeddingsClient;
}
