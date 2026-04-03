const { Pinecone } = require("@pinecone-database/pinecone");
const path = require("path");

// explicitly point to .env.local
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

async function test() {
  console.log("API Key found:", !!process.env.PINECONE_API_KEY);

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexes = await pinecone.listIndexes();
  console.log("Connected! Your indexes:", indexes);
}

test();
