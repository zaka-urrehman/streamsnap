import React from 'react'
import PaymentButton from './buttons/PaymentButton'
import SubscriptionPlan from './SubscriptionPlan'

const SubscriptionCard = () => {
    return (
        <>
            <SubscriptionPlan type="FREE">
                <div className="flex-1 flex flex-col justify-end">
                    <div className="bg-gradient-to-br from-mySecondary-50 to-mySecondary-100 border border-mySecondary-500 dark:border-0 dark:bg-gradient-to-br dark:from-[#1d1d1e] dark:to-[#1e1e1e] p-3 rounded-2xl flex flex-col gap-y-3">
                        <span className="text-sm">
                            Upgrade to {''}
                            <span className="bg-gradient-to-br from-mySecondary-300 to-mySecondary-600 font-bold bg-clip-text text-transparent">
                                Smart AI
                            </span>
                        </span>
                        <p className="text-[#9B9CA0] font-light text-sm">
                            Unlock all features <br /> including AI and more
                        </p>
                        <PaymentButton />
                    </div>
                </div>
            </SubscriptionPlan>
            </>
    )
}

export default SubscriptionCard