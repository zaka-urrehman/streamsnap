'use client'
import React from 'react'
import Search from './Search'
import SmallScreenSideBar from './SmallScreenSideBar'
import CreateAutomation from './CreateAutomation'
import { Notifications } from './Notifications'
import { UsePath } from '@/hooks/use-path'
import MainBreadCrumb from './MainBreadCrumb'
// import CreateAutomation from ''

interface Props {
    slug: string
}

const Infobar = ({ slug }: Props) => {
    const { page } = UsePath()
    return (
        <>
            <div className='flex justify-between rounded-lg py-2 px-4 w-full'>
                <div className='max-md:hidden'>
                    <Search />
                </div>

                <div className='max-lg:order-2'>
                    <CreateAutomation />
                </div>

                <div className='max-lg:order-1'>
                    <Notifications />
                </div>

                <div className='lg:hidden max-lg:order-3'>
                    <SmallScreenSideBar slug={slug} />
                </div>
            </div>

            <div className='max-lg:px-4'>
                <MainBreadCrumb
                    page={page === slug ? 'Home' : page}
                    slug={slug}
                />
            </div>
        </>
    )
}

export default Infobar