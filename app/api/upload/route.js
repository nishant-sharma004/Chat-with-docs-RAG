import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { storeVectors, clearVectors } from "../../../lib/vectorstore";
import { getEmbeddings } from "../../../lib/embeddings";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const type = formData.get("type");
    let docs = [];

    if (type === "pdf") {
      const file = formData.get("file");
      const buffer = Buffer.from(await file.arrayBuffer());
      const blob = new Blob([buffer], { type: "application/pdf" });
      const loader = new PDFLoader(blob);
      docs = await loader.load();
    }

    if (type === "url") {
      const url = formData.get("url");
      const loader = new CheerioWebBaseLoader(url, {
        selector: "p, h1, h2, h3, h4, h5, li, span",
      });
      docs = await loader.load();
    }

    // DEBUG — test embeddings directly
    const embeddings = getEmbeddings();
    const testVector = await embeddings.embedQuery("test");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunks = await splitter.splitDocuments(docs);
    await clearVectors();
    await storeVectors(chunks);

    return NextResponse.json({
      success: true,
      chunksStored: chunks.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
