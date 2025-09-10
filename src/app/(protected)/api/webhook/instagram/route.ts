import { findAutomation } from "@/actions/automations/queries"
import { createChatHistory, getChatHistory, getKeywordAutomation, getKeywordPost, matchKeyword, trackResponses } from "@/actions/webhook/queries"
import { sendDM, sendPrivateMessage } from "@/lib/fetch"
import { client } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { generateAIResponse } from "@/lib/smart-ai/smart_ai"
import { getAgentResponseManually } from "@/lib/ai/agent"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(req: NextRequest) {
    const hub = req.nextUrl.searchParams.get('hub.challenge')
    return new NextResponse(hub)
}


export async function POST(req: NextRequest) {
    const webhookPayload = await req.json()
    console.log("webhook payload: ", webhookPayload)
    if (webhookPayload?.entry?.[0]?.id === webhookPayload?.entry?.[0]?.messaging?.[0]?.sender?.id || webhookPayload?.entry?.[0]?.id === webhookPayload?.entry?.[0]?.changes?.[0]?.value?.from?.id) {
        console.log("this event is fired by own reply")
        return NextResponse.json(
            {
                message: 'Event from our own response detected',
            },
            { status: 200 }
        )
    }
    let matcher

    try {
        // check if payload contain an DM
        if (webhookPayload.entry[0].messaging) {
            // match the keyword in payload message with the keyword stored in db
            matcher = await matchKeyword(
                webhookPayload.entry[0].messaging[0].message.text
            )
        }

        // check if payload contain a comment 
        if (webhookPayload.entry[0].changes) {
            matcher = await matchKeyword(
                webhookPayload.entry[0].changes[0].value.text
            )
        }
        // if keyword is succesfuly found in db along with an automation id
        if (matcher && matcher.automationId) {
            // We have a keyword matcher
            console.log('Matched')

            if (webhookPayload.entry[0].messaging) {
                // get that specific automation
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    true
                )

                if (automation && automation.trigger) {
                    if (
                        automation.listener &&
                        automation.listener.listener === 'MESSAGE'
                    ) {
                        // send DM
                        const direct_message = await sendDM(
                            webhookPayload.entry[0].id,
                            webhookPayload.entry[0].messaging[0].sender.id,
                            automation.listener?.prompt,
                            automation.User?.integrations[0].token!
                        )
                        // keep a record of the sent message
                        if (direct_message.status === 200) {
                            const tracked = await trackResponses(automation.id, 'DM')
                            if (tracked) {
                                return NextResponse.json(
                                    {
                                        message: 'Message sent',
                                    },
                                    { status: 200 }
                                )
                            }
                        }
                    }

                    if (
                        automation.listener &&
                        automation.listener.listener === 'SMARTAI' &&
                        automation.User?.subscription?.plan === 'PRO'
                    ) {
                        const message = webhookPayload.entry[0].messaging[0].message.text
                        const customer_history = await getChatHistory(
                            webhookPayload.entry[0].messaging[0].recipient.id,
                            webhookPayload.entry[0].messaging[0].sender.id
                        )
                        let chatHistory = customer_history.history.slice(-8)
                        const smartAIText = await generateAIResponse(message, automation.listener?.prompt!, chatHistory)

                        if (smartAIText) {
                            console.log("this is the smart AI text: ", smartAIText)
                            const DMSender = createChatHistory(
                                automation.id,
                                webhookPayload.entry[0].messaging[0].sender.id,
                                webhookPayload.entry[0].id,
                                webhookPayload.entry[0].messaging[0].message.text
                            );
                            console.log("DM sender: ", DMSender)
                            const DMResponder = createChatHistory(
                                automation.id,
                                webhookPayload.entry[0].id,
                                webhookPayload.entry[0].messaging[0].sender.id,
                                smartAIText
                            );
                            console.log("DM responder: ", DMResponder)

                            await client.$transaction([DMSender, DMResponder]);

                            const directMessage = await sendDM(
                                webhookPayload.entry[0].id,
                                webhookPayload.entry[0].messaging[0].sender.id,
                                smartAIText,
                                automation.User?.integrations[0].token!
                            );
                            console.log("direct message status: ", directMessage.status)

                            if (directMessage.status === 200) {
                                const tracked = await trackResponses(automation.id, "DM");
                                console.log("tracked: ", tracked)
                                if (tracked) {
                                    return NextResponse.json(
                                        { message: "Message sent" },
                                        { status: 200 }
                                    );
                                }
                            }
                        }

                        // if the plan is pro then use smart ai to generate a response
                        // const smart_ai_message = await openai.chat.completions.create({
                        //     model: 'gpt-4o',
                        //     messages: [
                        //         {
                        //             role: 'assistant',
                        //             content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
                        //         },
                        //     ],
                        // })

                        // if (smart_ai_message.choices[0].message.content) {
                        //     const reciever = createChatHistory(
                        //         automation.id,
                        //         webhookPayload.entry[0].id,
                        //         webhookPayload.entry[0].messaging[0].sender.id,
                        //         webhookPayload.entry[0].messaging[0].message.text
                        //     )

                        //     const sender = createChatHistory(
                        //         automation.id,
                        //         webhookPayload.entry[0].id,
                        //         webhookPayload.entry[0].messaging[0].sender.id,
                        //         smart_ai_message.choices[0].message.content
                        //     )
                        //     // perform the transaction in db
                        //     await client.$transaction([reciever, sender])

                        //     const direct_message = await sendDM(
                        //         webhookPayload.entry[0].id,
                        //         webhookPayload.entry[0].messaging[0].sender.id,
                        //         smart_ai_message.choices[0].message.content,
                        //         automation.User?.integrations[0].token!
                        //     )

                        //     if (direct_message.status === 200) {
                        //         const tracked = await trackResponses(automation.id, 'DM')
                        //         if (tracked) {
                        //             return NextResponse.json(
                        //                 {
                        //                     message: 'Message sent',
                        //                 },
                        //                 { status: 200 }
                        //             )
                        //         }
                        //     }
                        // }

                    }
                }
            }

            if (
                webhookPayload.entry[0].changes &&
                webhookPayload.entry[0].changes[0].field === 'comments'
            ) {
                const automation = await getKeywordAutomation(
                    matcher.automationId,
                    false
                )

                // get the post
                const automations_post = await getKeywordPost(
                    webhookPayload.entry[0].changes[0].value.media.id,
                    automation?.id!
                )

                console.log('post keyword ', automations_post)

                if (automation && automations_post && automation.trigger) {
                    if (automation.listener) {
                        if (automation.listener.listener === 'MESSAGE') {
                            console.log(
                                'SENDING DM, WEB HOOK PAYLOAD',
                                webhookPayload,
                                'changes',
                                webhookPayload.entry[0].changes[0].value.from
                            )

                            console.log(
                                'COMMENT VERSION:',
                                webhookPayload.entry[0].changes[0].value.from.id
                            )

                            const direct_message = await sendPrivateMessage(
                                webhookPayload.entry[0].id,
                                webhookPayload.entry[0].changes[0].value.id,
                                automation.listener?.prompt,
                                automation.User?.integrations[0].token!
                            )

                            if (direct_message.status === 200) {
                                const tracked = await trackResponses(automation.id, 'COMMENT')

                                if (tracked) {
                                    return NextResponse.json(
                                        {
                                            message: 'Message sent',
                                        },
                                        { status: 200 }
                                    )
                                }
                            }
                        }
                        if (
                            automation.listener.listener === 'SMARTAI' &&
                            automation.User?.subscription?.plan === 'PRO'
                        ) {
                            const prompt = `${automation.listener?.prompt}: Keep responses under 3 sentences`;
                            console.log("prompt: ", prompt)
                            const smartAIResponse = await geminiModel.generateContent(prompt);
                            const smartAIText = smartAIResponse.response.text()
                            console.log("AI Response: ", smartAIText)



                            // const smart_ai_message = await openai.chat.completions.create({
                            //     model: 'gpt-4o',
                            //     messages: [
                            //         {
                            //             role: 'assistant',
                            //             content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                            //         },
                            //     ],
                            // })
                            if (smartAIText) {
                                const commenter = createChatHistory(
                                    automation.id,
                                    webhookPayload.entry[0].changes[0].value.from.id,
                                    webhookPayload.entry[0].id,
                                    webhookPayload.entry[0].changes[0].value.text
                                )

                                const AIresponder = createChatHistory(
                                    automation.id,
                                    webhookPayload.entry[0].id,
                                    webhookPayload.entry[0].changes[0].value.from.id,
                                    smartAIText
                                )

                                await client.$transaction([commenter, AIresponder])

                                const direct_message = await sendPrivateMessage(
                                    webhookPayload.entry[0].id,
                                    webhookPayload.entry[0].changes[0].value.id,
                                    automation.listener?.prompt,
                                    automation.User?.integrations[0].token!
                                )

                                if (direct_message.status === 200) {
                                    const tracked = await trackResponses(automation.id, 'COMMENT')

                                    if (tracked) {
                                        return NextResponse.json(
                                            {
                                                message: 'Message sent',
                                            },
                                            { status: 200 }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        // if matched keyword not found. it is possible that the user has sent the keyword previosly and is now continuing the chat. In that case we will look in the chat history
        if (!matcher) {
            console.log('Not matched')
            const customer_history = await getChatHistory(
                webhookPayload.entry[0].messaging[0].recipient.id,
                webhookPayload.entry[0].messaging[0].sender.id
            )

            console.log('customer history: ', customer_history)

            if (customer_history.history.length > 0) {
                const automation = await findAutomation(customer_history.automationId!)

                if (
                    automation?.User?.subscription?.plan === 'PRO' &&
                    automation.listener?.listener === 'SMARTAI'
                ) {
                    // const prompt = `${automation.listener?.prompt}: Keep responses under 2 sentences`;
                    // console.log("prompt-2: ", prompt)
                    // const smartAIResponse = await geminiModel.generateContent(prompt);
                    // const smartAIText = smartAIResponse.response.text()
                    // console.log("AI Response-2: ", smartAIText)
                    const message = webhookPayload.entry[0].messaging[0].message.text
                    let smartAIText;
                    let chatHistory = customer_history.history.slice(-8)
                    console.log("chat history: ", chatHistory)
                    if (message) {
                        smartAIText = await generateAIResponse(message, automation.listener?.prompt!, chatHistory)
                    }

                    // const smart_ai_message = await openai.chat.completions.create({
                    //     model: 'gpt-4o',
                    //     messages: [
                    //         {
                    //             role: 'assistant',
                    //             content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
                    //         },
                    //         ...customer_history.history,
                    //         {
                    //             role: 'user',
                    //             content: webhookPayload.entry[0].messaging[0].message.text,
                    //         },
                    //     ],
                    // })

                    if (smartAIText) {
                        const DMSender = createChatHistory(
                            automation.id,
                            webhookPayload.entry[0].messaging[0].sender.id,
                            webhookPayload.entry[0].id,
                            webhookPayload.entry[0].messaging[0].message.text
                        )

                        const DMResponder = createChatHistory(
                            automation.id,
                            webhookPayload.entry[0].id,
                            webhookPayload.entry[0].messaging[0].sender.id,
                            smartAIText
                        )

                        await client.$transaction([DMSender, DMResponder])
                        const direct_message = await sendDM(
                            webhookPayload.entry[0].id,
                            webhookPayload.entry[0].messaging[0].sender.id,
                            smartAIText,
                            automation.User?.integrations[0].token!
                        )

                        if (direct_message.status === 200) {
                            //if successfully send we return
                            return NextResponse.json(
                                {
                                    message: 'Message sent',
                                },
                                { status: 200 }
                            )
                        }
                    }
                }
            }
            // we are sending status 200 with every response because the instagram api fire the webhook again and again if it does not get the status 200 in reponse.
            // status other than 200 can lead to account ban 
            return NextResponse.json(
                {
                    message: 'No automation set',
                },
                { status: 200 }
            )
        }
        return NextResponse.json(
            {
                message: 'No automation set',
            },
            { status: 200 }
        )
    } catch (error) {

        return NextResponse.json(
            {
                message: 'No automation set',
            },
            { status: 200 }
        )
    }

}