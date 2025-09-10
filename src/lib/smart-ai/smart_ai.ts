// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI, Type } from "@google/genai"
import { getAllItems, getItemByName, getItemById, placeOrder } from "./tools"
import { toolsDeclarations, toolsEnum } from "./tool-declarations"


// If user message contain the keyword, then generate a response
// export const generateAIResponse = async (senderMessage: string, instructions: string) => {
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
//     const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const AIprompt = `You are a helpful smart AI assistant for instagram, respond to the following message from a user: ${senderMessage}`;
//     const smartAIResponse = await geminiModel.generateContent(AIprompt);
//     const smartAIText = smartAIResponse.response.text()

//     return smartAIText
// }

export const generateAIResponse = async (senderMessage: string, instructions: string, chatHistory: {role: string, content: string}[]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })
    const text = `
    Instructions:
    1. Role and Context:
       - You are a highly capable Instagram assistant responsible for managing and responding to messages on behalf of the account owner.
       - Your primary goal is to help facilitate communication and maintain a professional and engaging presence.
    
    2. Tool Usage and Function Calls:
       - You are allowed and expected to call any necessary tools with the proper arguments to assist in responding to messages.
       - If you encounter any function calls with incomplete or missing data, generate a clear and polite text response asking for the additional information required.
    
    3. Incorporating Input Data:
       - Follow the account owner's specific instructions provided here: ${instructions}.
       - Review and consider the chat history for context:  ${JSON.stringify(chatHistory, null, 2)}.
       - Process the new incoming user message: ${senderMessage}.
    
    4. Response Requirements:
       - Ensure your response aligns with the account owner's instructions and tone.
       - Maintain clarity and helpfulness in your replies.
       - If any data is insufficient for a complete action, ask the user for the missing details before proceeding.
    
    Please use this structured approach to ensure that all responses are clear, context-aware, and actionable.
    `;
    // console.log(text)

    let messages: any = [
        {
            role: 'user',
            parts: [{
                text
            }]
        }
    ]

    const invokeLLM = async (messages: object[]) => {
        let response;

        try {
            response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: messages,
                config: {
                    tools: [{
                        functionDeclarations: toolsDeclarations

                    }]
                }
            })
            // console.log("response: ", response)
        } catch (error) {
            console.error("Error generating content: ", error)
        }

        return response
    }

    let response = await invokeLLM(messages)



    // Check for function calls in the response
    if (response?.functionCalls && response.functionCalls.length > 0) {
        for (const functionCall of response.functionCalls) {
            messages.push({ role: 'model', parts: [{ functionCall: functionCall }] });
            // console.log(`Function to call: ${functionCall.name}`);
            // console.log(`Arguments: ${JSON.stringify(functionCall.args)}`)
            //    @ts-ignore 
            const mappedArgs = Object.entries(functionCall.args).map(([key, value]) => value);
            //    @ts-ignore 
            const result = await toolsEnum[functionCall.name](...mappedArgs);

            // console.log(`Function result: ${JSON.stringify(result)}`)

            messages.push({
                role: 'user',
                parts: [
                    {
                        functionResponse: {
                            name: functionCall.name,
                            response: { content: result }
                        }
                    }
                ]
            })
        }
        response = await invokeLLM(messages)     

    } else {
        console.log("No function call found in the response.")
        console.log(response?.text);
    }

    return response?.text
}





