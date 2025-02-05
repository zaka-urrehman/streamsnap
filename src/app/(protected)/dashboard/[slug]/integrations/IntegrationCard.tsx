'use client'
import { onOAuthInstagram } from '@/actions/integration'
// import { onOAuthInstagram } from '@/actions/integrations'
import { getUserInfo } from '@/actions/user'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {
    title: string
    description: string
    icon: React.ReactNode
    strategy: 'INSTAGRAM' | 'CRM'
}

const IntegrationCard = ({ description, icon, strategy, title }: Props) => {

    const onInstaOAuth = () => {
        const call = onOAuthInstagram(strategy)
        console.log("call", call)
        return call
    }

    const { data } = useQuery({
        queryKey: ['user-profile'],
        queryFn: getUserInfo,
    })

    // @ts-ignore
    const integrated = data?.data?.integrations.find(
        (integration: any) => integration.name === strategy
    )


    return (
        <div className="border-2 border-gray-400 rounded-2xl p-5 flex max-md:flex-col max-md:text-center items-center justify-between gap-y-3 gap-x-5 ">
            {/* <div> */}
            {icon}
            {/* </div> */}
            <div className="flex flex-col flex-1">
                <h3 className="lg:text-lg"> {title}</h3>
                <p className="text-[#9D9D9D] text-sm lg:text-base ">{description}</p>
            </div>
            <Button
                onClick={onInstaOAuth}
                disabled={integrated?.name === strategy}
                className=" text-white rounded-full  bg-mySecondary-500  hover:opacity-70 transition duration-100 max-md:mt-3"
            >
                {integrated ? 'Connected' : 'Connect'}
            </Button>
        </div>
    )
}

export default IntegrationCard
