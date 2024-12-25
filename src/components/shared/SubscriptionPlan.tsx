import React from 'react'

type SubscriptionType = "FREE" | "PRO"

interface Props {
    type: SubscriptionType
    children: React.ReactNode
}

const SubscriptionPlan = ({ children, type }: Props) => {
    // TODO: Implement subscription plan
    return (
        <>
            {children}
        </>
    )
}

export default SubscriptionPlan