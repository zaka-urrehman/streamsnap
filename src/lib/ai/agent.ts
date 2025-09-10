import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateRagResponse } from "./rag";

/**
 * getAgentResponseManually uses a manually created tool‐system.
 * 
 * It provides Gemini with a meta prompt that includes the description of our
 * only tool—the RAG function. The LLM then decides whether to call that tool.
 *
 * If the LLM outputs an answer beginning with "RAG:", we strip the prefix and
 * pass the remaining text to generateRagResponse. Otherwise, we assume the LLM
 * provided a complete answer.
 *
 * Environment variable required:
 *   GEMINI_API_KEY - Your Google Gemini API key.
 *
 * @param userQuery - The incoming user query.
 * @returns The final answer string.
 */
export async function getAgentResponseManually(userQuery: string, automationId: string): Promise<string> {
    const geminiApiKey = process.env.GEMINI_API_KEY as string;
    if (!geminiApiKey) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    // Define our available tool: the RAG function.
    const toolDescription = `RAG: Use this tool if the user’s query requires retrieval 
  of external document context via our Pinecone index. Input should be a plain text query.`;

    // Build a meta prompt that instructs the LLM on when to call the tool.
    const metaPrompt = `
                  You are a smart assistant. Below is a tool available for you:

                     Tool Name: RAG
                     Tool Description: ${toolDescription}

                     Instructions:
                     • If the user query is simple and can be answered directly, provide a concise answer.
                     • If the query requires retrieval of additional context from our documents (for example, if it asks for details or references external materials), then respond with "RAG: <your query>" where <your query> is the text to be used for retrieval.

                     User Query: ${userQuery}

                     Please respond accordingly.
        `;

    // Call Gemini with the meta prompt.
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const metaResponse = await geminiModel.generateContent(metaPrompt);
    const metaOutput = metaResponse.response.text().trim();
    console.log("LLM meta response:", metaOutput);

    // If the LLM decided that RAG is needed, its response will begin with "RAG:".
    if (metaOutput.toUpperCase().startsWith("RAG:")) {
        const toolInput = metaOutput.substring(4).trim(); // Remove the "RAG:" prefix.
        console.log("LLM decided to call RAG tool with input:", toolInput);
        // Call the RAG function manually.
        const ragAnswer = await generateRagResponse(toolInput, automationId);
        return ragAnswer;
    }

    // Otherwise, return the direct answer provided by Gemini.
    return metaOutput;
}