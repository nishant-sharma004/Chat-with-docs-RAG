import { Pinecone } from "@pinecone-database/pinecone";

let pineconeClient = null;

export async function getPineconeClient() {
  if (pineconeClient) {
    return pineconeClient;
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  return pineconeClient;
}
