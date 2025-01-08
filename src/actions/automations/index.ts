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
