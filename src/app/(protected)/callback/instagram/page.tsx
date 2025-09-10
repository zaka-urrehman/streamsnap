import { onIntegrate } from '@/actions/integration'
import { redirect } from 'next/navigation'

interface Props {
    searchParams: {
        code: string
    }
}

const Page = async ({ searchParams: { code } }: Props) => {
    if (code) {
        console.log("this is the code: ", code)
        const user = await onIntegrate(code.split("#_")[0])
        console.log("this is the user: ", user)
        if (user.status == 200) {
            "redirecting to dashboard"
            return redirect(`/dashboard/${user?.data?.firstname!}${user?.data?.lastname!}`)
        }
    }
    return (
        redirect('/instagram-auth-failed')
    )
}

export default Page