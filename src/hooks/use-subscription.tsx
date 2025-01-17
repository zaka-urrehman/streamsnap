import axios from 'axios'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export const useSubscription = () => {
    const [isProcessing, setIsProcessing] = useState(false)
    const onSubscribe = async () => {
        setIsProcessing(true)
        try {
            const response = await axios.get('/api/payment')
            if (response.data.status === 200) {
                window.location.href = `${response.data.session_url}`
                return redirect(response.data.session_url)
            }
        } catch (error) {
            console.error('Subscription error:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    return { onSubscribe, isProcessing }
}
