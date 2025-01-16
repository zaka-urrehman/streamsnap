import { useQueryUser } from '@/hooks/user-queries'
import React from 'react'

type SubscriptionType = "FREE" | "PRO"

interface Props {
    type: SubscriptionType
    children: React.ReactNode
}

const SubscriptionPlan = ({ children, type }: Props) => {
    const { data }: any = useQueryUser()


    return data?.data?.subscription?.plan === type && children
}

export default SubscriptionPlan