'use server'

import { getCurrentUser } from "../user"
import { createAutomation, getAutomations } from "./queries"


export const getAllAutomations = async () => {
    const user = await getCurrentUser()
    try {
        const automations = await getAutomations(user.id)
        if (automations) return { status: 200, data: automations.automations }
        return { status: 404, data: [] }
    } catch (error) {
        return { status: 500, data: [] }
    }
}


export const createAutomations = async (id?: string) => {
    const user = await getCurrentUser()
    try {
        const create = await createAutomation(user.id, id)
        if (create) return { status: 200, data: 'Automation created', res: create }

        return { status: 404, data: 'Oops! something went wrong' }
    } catch (error) {
        return { status: 500, data: 'Internal server error' }
    }
}