import { Button } from '@/components/ui/button'
import { PLANS } from '@/constants/Pages'
import { useSubscription } from '@/hooks/use-subscription'
import { cn } from '@/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

type Props = {
    label: string
    current: 'PRO' | 'FREE'
    landing?: boolean
}

const PaymentCard = ({ current, label, landing }: Props) => {
    const { onSubscribe, isProcessing } = useSubscription()
    return (
        <div
            className={cn(
                label !== current
                    ? 'bg-in-active'
                    : 'bg-gradient-to-br from-white to-mySecondary-500/30 dark:from-mySecondary-950 dark:to-mySecondary-600',
                'p-[2px] rounded-xl overflow-hidden border border-gray-400 max-w-96'
            )}
        >
            <div
                className={cn(
                    landing && 'radial--gradient--pink',
                    'flex flex-col rounded-xl pl-5 py-5 pr-10 bg-background-90 h-full'
                )}
            >
                {landing ? (
                    <h2 className="text-2xl">
                        {label === 'PRO' && 'Premium Plan'}
                        {label === 'FREE' && 'Standard'}
                    </h2>
                ) : (
                    <h2 className="text-2xl">
                        {label === current
                            ? 'Your Current Plan'
                            : current === 'PRO'
                                ? 'Downgrade'
                                : 'Upgrade'}
                    </h2>
                )}
                <p className=" text-sm mb-2">
                    This is what your plan covers for automations and Ai features
                </p>
                {label === 'PRO' ? (
                    <span className="bg-gradient-to-br text-3xl from-mySecondary-300  to-mySecondary-700 bg-clip-text font-bold text-transparent">
                        Smart AI
                    </span>
                ) : (
                    <p className="font-bold mt-2 text-text-secondary">Standard</p>
                )}
                {label === 'PRO' ? (
                    <p className="mb-2">
                        <b className="text-xl">$99</b>/month
                    </p>
                ) : (
                    <p className="text-xl mb-2">Free</p>
                )}

                {PLANS[label === 'PRO' ? 1 : 0].features.map((i) => (
                    <div
                        key={i}
                        className="mt-2 text-muted-foreground grid grid-cols-[1fr,11fr] gap-2 text-xs sm:text-sm lg:text-base "
                    >
                        <CircleCheck className="text-mySecondary-500 size-6" />
                        <p>{i}</p>
                    </div>
                ))}

                {landing ? (
                    <Button
                        className={cn(
                            'rounded-full mt-5',
                            label === 'PRO'
                                ? 'bg-gradient-to-r from-mySecondary-900 to-mySecondary-500'
                                : 'text-gray-800 dark:text-white hover:text-background-80'
                        )}
                    >
                        {label === current
                            ? 'Get Started'
                            : current === 'PRO'
                                ? 'Free'
                                : 'Get Started'}
                    </Button>
                ) : (
                    <Button
                        onClick={onSubscribe}
                        className={cn(
                            'rounded-full mt-5 border border-gray-400 bg-transparent hover:bg-mySecondary-400 text-gray-800 dark:text-white ',
                            label === current && ' bg-green-500 text-white'
                        )}
                        disabled={label === current}
                    >
                        {label === current ? 'Active' : current === 'PRO' ? 'Downgrade' : 'Upgrade'}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default PaymentCard
