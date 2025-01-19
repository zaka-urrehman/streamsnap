import { onIntegrate } from '@/actions/integration'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    serachParams: {
        code: string
    }
}

const Page = async ({ serachParams: { code } }: Props) => {
    if (code) {
        console.log(code)
        const user = await onIntegrate(code.split("#_")[0])
        if (user.status == 200) {
            redirect(`/dashboard/${user?.data?.firstname!}${user?.data?.lastname!}`)
        }
    }
    return (
        redirect('sign-up')
    )
}

export default Page