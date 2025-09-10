"use server"
import { Pinecone } from "@pinecone-database/pinecone";
import { generateEmbedding } from "./ai/embedding";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
})


export const saveFileToVectorDb = async (fileData: any) => {
    console.log("inside saveFileToVectorDb function", fileData);
    try {
        // Destructure the fileData object
        const { embedding, fileDetails, metadata } = fileData;

        // Log the file details for debugging
        console.log("File received:", {
            name: fileDetails.name,
            size: fileDetails.size,
            type: fileDetails.type,
            metadata: metadata,
        });

        // Generate embeddings from the Base64 file content.
        // The generateEmbedding function will decode the content and generate a vector.
        

        // Create a unique ID for the document
        const documentId = `${metadata.userId}-${metadata.automationId}-${fileDetails.name}`;

        // Get the Pinecone index. Make sure to use the correct index name and host.
        const index = pc.index("my-index", "https://my-index-rzmo3fd.svc.aped-4627-b74a.pinecone.io");

        // Specify a namespace (adjust this value as needed)
        const namespace = "example-namespace";

        // Prepare the record to upsert. The record must include an id, the embedding vector, and any metadata.
        const records = [
            {
                id: documentId,
                values: embedding,
                metadata: {
                    fileName: fileDetails.name,
                    fileSize: fileDetails.size,
                    fileType: fileDetails.type,
                    ...metadata,
                },
            },
        ];

        // Upsert the record into the specified namespace.
        const upsertResponse = await index.namespace(namespace).upsert(records);

        console.log('Document stored successfully:', upsertResponse);

        // Return success response
        return {
            status: 200,
            data: 'File processed and stored successfully',
            metadata: {
                fileName: fileDetails.name,
                fileSize: fileDetails.size,
                fileType: fileDetails.type,
                ...metadata,
            },
        };
    } catch (error) {
        console.error('Error processing file:', error);
        return {
            status: 500,
            data: 'Error processing file',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};