'use client'
import React from 'react'
import PaymentCard from './PaymentCard'

type Props = {}

const Billing = (props: Props) => {
    return (
        <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 items-center py-6 px-4">
            <PaymentCard
                current={"FREE"}
                label="FREE"
            />
            <PaymentCard
                current={"FREE"}
                label="PRO"
            />
        </div>
    )
}

export default Billing
