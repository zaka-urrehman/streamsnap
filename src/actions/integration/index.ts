import { redirect } from "next/navigation"
import { getCurrentUser } from "../user"
import { createIntegration, getIntegration } from "./queries"
import { generateTokens } from "@/lib/fetch"
import axios from "axios"

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
    if (strategy === 'INSTAGRAM') {       
        window.location.href = process.env.NEXT_PUBLIC_INSTAGRAM_EMBEDDED_OAUTH_URL as string
    }
}

export const onIntegrate = async (code: string) => {
    const user = await getCurrentUser()

    try {
        // get integration for the user
        const integration = await getIntegration(user.id)

        if (integration && integration.integrations.length === 0) {
            const token = await generateTokens(code)
            console.log(token)

            if (token) {
                const insta_id = await axios.get(`${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`)

                const today = new Date()
                const expire_date = today.setDate(today.getDate() + 60)
                const create = await createIntegration(
                    user.id,
                    token.access_token,
                    new Date(expire_date),
                    insta_id.data.user_id
                )
                return { status: 200, data: create }
            }
            console.log('🔴 401')
            return { status: 401 }
        }
        console.log('🔴 404')
        return { status: 404 }
    } catch (error) {
        console.log('🔴 500', error)
        return { status: 500 }
    }
}