import Sidebar from '@/components/shared/Sidebar'
import SmallScreenSideBar from '@/components/shared/SmallScreenSideBar'
import React from 'react'

interface Props {
    children: React.ReactNode
    params: { slug: string }
}

const Layout = ({ children, params }: Props) => {
    return (
        <div className=''>
            <Sidebar slug={params.slug} />
            <div className='lg:hidden'>
                <SmallScreenSideBar slug={params.slug} />
            </div>
            {children}
        </div>
    )
}

export default Layout