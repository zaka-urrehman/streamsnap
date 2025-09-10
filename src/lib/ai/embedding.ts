"use server"
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";


/**
 * Generates an embedding using Hugging Face's Inference API.
 * 
 * This function uses the free community model "sentence-transformers/all-MiniLM-L6-v2".
 * Optionally, you can provide your Hugging Face API key if needed.
 *
 * @param text The text to embed.
 * @returns A promise that resolves to a vector of numbers.
 */
export async function generateEmbedding(fileContent: string): Promise<number[]> {
    // Validate API key
    if (!process.env.HUGGINGFACE_API_KEY) {
        console.log('HUGGINGFACE_API_KEY is not set in environment variables');
    }
    // Decode the Base64 content to a UTF-8 string
    const decodedContent = Buffer.from(fileContent, 'base64').toString('utf-8');
    const embeddings = new HuggingFaceInferenceEmbeddings({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        // Uncomment and add your API key if required:
        apiKey: process.env.HUGGINGFACE_API_KEY,
    });
    // Generate embedding for the decoded text
    const embedding = await embeddings.embedQuery(decodedContent);
    return embedding;
}






