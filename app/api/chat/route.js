import { streamText, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { searchVectors } from "../../../lib/vectorstore";

// Step 1 — rephrase question using chat history
async function rephraseQuestion(messages) {
  // get current question text
  const currentQuestion = messages[messages.length - 1];
  const questionText = currentQuestion?.parts
    ? currentQuestion.parts
        .filter((p) => p.type === "text")
        .map((p) => p.text)
        .join("")
        .trim()
    : currentQuestion?.content?.trim() || "";

  // if first message — no rephrasing needed
  if (messages.length <= 1) return questionText;

  // if question is empty return empty
  if (!questionText) return "";

  try {
    // build simple history — only last 4 messages max
    const recentHistory = messages
      .slice(-5, -1)
      .map((m) => {
        const text = m.parts
          ? m.parts
              .filter((p) => p.type === "text")
              .map((p) => p.text)
              .join("")
              .trim()
          : m.content?.trim() || "";
        return `${m.role}: ${text}`;
      })
      .filter((line) => line.length > 10)
      .join("\n");

    // if no meaningful history just return question
    if (!recentHistory) return questionText;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `Conversation so far:
${recentHistory}

New question: "${questionText}"

Rewrite the new question as a standalone search query.
Return ONLY the rewritten question. Keep it short.`,
    });

    return text?.trim() || questionText;
  } catch (error) {
    // if rephrasing fails → use original question
    return questionText;
  }
}

export async function POST(request) {
  try {
    const { messages } = await request.json();

    // Step 2 — rephrase question using history
    const rephrasedQuestion = await rephraseQuestion(messages);
    // Step 3 — search Pinecone with rephrased question
    const relevantDocs = await searchVectors(rephrasedQuestion, 3);
    const context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");
    // Step 4 — convert UI messages to core messages
    const coreMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.parts
        ? msg.parts
            .filter((p) => p.type === "text")
            .map((p) => p.text)
            .join("")
        : msg.content || "",
    }));

    // Step 5 — stream answer with full history + context
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: `You are a helpful assistant that answers questions 
               based ONLY on the context below.
               If answer not in context say: 
               "I could not find this in the uploaded documents."
               
               Context:
               ${context}`,
      messages: coreMessages,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
