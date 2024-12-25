import { Button } from '@/components/ui/button'
// import { useSubscription } from '@/hooks/use-subscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'


const PaymentButton = () => {
    //   const { onSubscribe, isProcessing } = useSubscription()
    return (
        <Button
            //   disabled={isProcessing}
            //   onClick={onSubscribe}
            className=" text-white font-bold rounded-full bg-gradient-to-br from-mySecondary-200 dark:from-mySecondary-300 via-mySecondary-500 dark:via-mySecondary-700 to-mySecondary-200 dark:to-mySecondary-300 hover:"
        >
            {/* {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />} */}
            Upgrade
        </Button>
    )
}

export default PaymentButton