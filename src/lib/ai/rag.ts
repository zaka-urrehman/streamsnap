import { generateEmbedding } from "./embedding";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Helper: convert plain text to base64
const toBase64 = (text: string): string => {
  return Buffer.from(text, 'utf-8').toString('base64');
}

/**
 * Generates a response by retrieving document text from Pinecone
 * based on a given automationId, then calling Gemini.
 *
 * This version expects that when documents are upserted, they include a 
 * metadata field "fileContent" which holds the exact text.
 *
 * @param senderMessage - The user's input message.
 * @param automationId - The automation id to filter the document.
 * @returns A promise that resolves with the generated response.
 */
export async function generateRagResponse(senderMessage: string, automationId: string): Promise<string> {
  // Encode the sender message in base64 for the embedding function.
  const senderMessageBase64 = toBase64(senderMessage);
  const queryVector = await generateEmbedding(senderMessageBase64);
  console.log("Query vector:", queryVector);

  // Initialize Pinecone
  const pineconeApiKey = process.env.PINECONE_API_KEY!;
  const pineconeIndexName = process.env.PINECONE_INDEX_NAME || "my-index";
  const pineconeIndexHost = process.env.PINECONE_INDEX_HOST || "https://my-index-rzmo3fd.svc.aped-4627-b74a.pinecone.io";
  if (!pineconeApiKey) {
    throw new Error("PINECONE_API_KEY is not set");
  }
  const pc = new Pinecone({ apiKey: pineconeApiKey });
  const index = pc.index(pineconeIndexName, pineconeIndexHost);
  const namespace = "example-namespace"; // Use your configured namespace

  // Query Pinecone with a filter on automationId.
  // Set includeValues to true if you wish to retrieve (non-text) vector values;
  // however, we now rely on metadata.fileContent for the document text.
  const queryResponse: any = await index.namespace(namespace).query({
    vector: queryVector,
    topK: 3,
    includeMetadata: true,
    includeValues: false,
    filter: { automationId }
  });
  console.log("Pinecone query response:", queryResponse);

  // Build retrievedText as the exact text stored in the document.
  // Here we expect that metadata.fileContent holds the text from the document.
  let retrievedText = "";
  if (queryResponse.matches && queryResponse.matches.length > 0) {
    for (const match of queryResponse.matches) {
      retrievedText += (match.metadata.fileContent || "") + "\n";
    }
  } else {
    retrievedText = "No document found for this automation.";
  }

  // Build the final prompt for Gemini.
  const prompt = `
Using the following document text:
${retrievedText}
Answer the user's question: ${senderMessage}
`;

  // Initialize Gemini via Google Generative AI integration.
  const geminiApiKey = process.env.GEMINI_API_KEY;
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not set");
  }
  const genAI = new GoogleGenerativeAI(geminiApiKey);
  const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Generate and return response using Gemini.
  const geminiResponse = await geminiModel.generateContent(prompt);
  const responseText = geminiResponse.response.text();
  return responseText;
}