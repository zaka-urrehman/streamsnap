'use server'

import { client } from "@/lib/prisma"


export const getAutomations = async (clerkId: string) => {
    return await client.user.findUnique({
      where: {
        clerkId,
      },
      select: {
        automations: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            keywords: true,
            listener: true,
          },
        },
      },
    })
  }

export const createAutomation = async (clerkId: string, id?: string) => {
    return await client.user.update({
        where: {
            clerkId
        },
        data: {
            automations: {
                create: {
                    ...(id && { id }),
                }
            }
        }
    })
}