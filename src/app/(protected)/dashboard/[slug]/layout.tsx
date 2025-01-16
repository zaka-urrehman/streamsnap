import Infobar from '@/components/shared/Infobar'
import Sidebar from '@/components/shared/Sidebar'
import { prefetchUserAutomations, prefetchUserProfile } from '@/react-query/prefetch'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

interface Props {
    children: React.ReactNode
    params: { slug: string }
}

const Layout = async ({ children, params }: Props) => {

    const queryClient = new QueryClient()
    await prefetchUserProfile(queryClient)
    await prefetchUserAutomations(queryClient)

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='flex '>
                <Sidebar slug={params.slug} />
                <div className='flex flex-col w-full max-h-screen overflow-y-scroll '>
                    <Infobar slug={params.slug} />
                    {children}
                </div>
            </div>
        </HydrationBoundary>
    )

}

export default Layout