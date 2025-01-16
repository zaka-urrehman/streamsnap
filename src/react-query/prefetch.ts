import { getAllAutomations, getAutomationInfo } from "@/actions/automations";
import { getUserInfo } from "@/actions/user";
import { QueryClient, QueryFunction } from "@tanstack/react-query";



const prefetch = async (client: QueryClient, queryAction: QueryFunction, key: string) => {
    return await client.prefetchQuery({
        queryKey: [key],
        queryFn: queryAction,
        staleTime: 60000
    })
}

export const prefetchUserProfile = async (client: QueryClient) => {
    return await prefetch(client, getUserInfo, 'user-profile')
}


export const prefetchUserAutomations = async (client: QueryClient) => {
    return await prefetch(client, getAllAutomations, 'user-automations')
}

export const prefetchUserAutomation = async (client: QueryClient, id: string) => {
    return await prefetch(client, () => getAutomationInfo(id), 'automaiton-info')
}