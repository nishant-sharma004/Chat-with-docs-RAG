import { PineconeStore } from "@langchain/pinecone";
import { getEmbeddings } from "./embeddings";
import { getPineconeClient } from "./pinecone";

export async function storeVectors(docs) {
  const client = await getPineconeClient();
  const embeddings = getEmbeddings();

  await PineconeStore.fromDocuments(docs, embeddings, {
    pineconeIndex: client.index(process.env.PINECONE_INDEX),
    maxConcurrency: 5,
  });
}

export async function searchVectors(query, k = 3) {
  const client = await getPineconeClient();
  const embeddings = getEmbeddings();

  if (!query || !query.trim()) {
    return [];
  }

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: client.index(process.env.PINECONE_INDEX),
  });

  const results = await vectorStore.similaritySearch(query.trim(), k);
  return results;
}

export async function clearVectors() {
  const client = await getPineconeClient();
  const index = client.index(process.env.PINECONE_INDEX);
  await index.deleteAll();
}
