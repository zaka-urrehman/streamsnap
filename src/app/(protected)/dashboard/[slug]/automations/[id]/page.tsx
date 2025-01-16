import { getAutomationInfo } from '@/actions/automations'
import PostNode from '@/components/shared/automations/post/PostNode'
import ThenNode from '@/components/shared/automations/then/ThenNode'
import AutomationsBreadCrumb from '@/components/shared/breadCrumbs/AutomationBreadCrumbs'
import { Warning } from '@/icons'
import { prefetchUserAutomation } from '@/react-query/prefetch'
import Trigger from '@/components/shared/automations/trigger/Trigger'

import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from '@tanstack/react-query'

import React from 'react'

type Props = {
    params: { id: string }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const info = await getAutomationInfo(params.id)
    return {
        // @ts-ignore 
        title: info.data?.name,
    }
}

const Page = async ({ params }: Props) => {
    const queryClient = new QueryClient()
    await prefetchUserAutomation(queryClient, params.id)

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className=" flex flex-col items-center gap-y-20">
                <AutomationsBreadCrumb id={params.id} />
                <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-gray-200 dark:bg-[#1D1D1D] gap-y-3">
                    <div className="flex gap-x-2">
                        <Warning />
                        When...
                    </div>
                    <Trigger id={params.id} />
                </div>
                <ThenNode id={params.id} />
                <PostNode id={params.id} />
            </div>
        </HydrationBoundary>
    )
}

export default Page
