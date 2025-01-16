"use server"

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createUser, findUser } from "./queries"
import { refreshToken } from "@/lib/fetch"
import { updateIntegration } from "../integration/queries"


export const getCurrentUser = async () => {
    const user = await currentUser()
    if (!user) return redirect('/sign-in')

    return user
}


export const onBoardUser = async () => {
    const user = await getCurrentUser()
    try {     
        const found = await findUser(user.id);

        if (found) {
            if (found?.integrations?.length! > 0) {
                const today = new Date()
                const time_left = found?.integrations[0].expiresAt?.getTime()! - today.getTime()
                const days = Math.round(time_left / (1000 * 3600 * 24))
                if (days < 5) {
                    console.log("refresh")

                    const refresh = await refreshToken(found?.integrations[0].token!)
                    const today = new Date()
                    const expiry_date = today.setDate(today.getDate() + 60)
                    const update_token = await updateIntegration(
                        refresh.access_token,
                        new Date(expiry_date),
                        found?.integrations[0].id!
                    )

                    if (!update_token) {
                        console.log("error updating token")
                    }
                }

            }
            return {
                status: 200,
                data: {
                    firstname: found?.firstname,
                    lastname: found?.lastname,
                }
            }
        }
        const user_created = await createUser(
            user.id,
            user.firstName!,
            user.lastName!,
            user.emailAddresses[0].emailAddress
        )
        return {
            status: 201,
            data: user_created
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            data: {
                message: "An Error Occured"
            }
        }
    }
}


export const getUserInfo = async () => {
    const user = await getCurrentUser()
    try {
        const profile = await findUser(user.id)
        if (profile) {
            return {
                status: 200,
                data: profile
            }
        }
        return { status: 404, data: { message: "user not found" } }
    } catch (error) {
        return { status: 500, data: { message: "error" } }
    }
}