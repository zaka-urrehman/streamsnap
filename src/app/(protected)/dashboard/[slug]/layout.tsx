import Infobar from '@/components/shared/Infobar'
import Sidebar from '@/components/shared/Sidebar'
import SmallScreenSideBar from '@/components/shared/SmallScreenSideBar'
import React from 'react'

interface Props {
    children: React.ReactNode
    params: { slug: string }
}

const Layout = ({ children, params }: Props) => {
    return (
        <div className='flex '>
            <Sidebar slug={params.slug} />
            <div className='flex flex-col w-full '>
                <Infobar slug={params.slug} />
                {children}
            </div>
        </div>
    )
    {/* <div className='lg:hidden'>
        <SmallScreenSideBar slug={params.slug} />
    </div> */}
}

export default Layout