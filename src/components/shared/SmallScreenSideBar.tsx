"use client"

import { Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import PageWrapper from './wrappers/PageWrapper'
import SidebarItems from './SidebarItems'
import { Separator } from '../ui/separator'
import UserAuthState from './buttons/UserAuthState'
import { HelpDuoToneCyan } from '@/icons'
import { usePath } from '@/hooks/use-path'
import SubscriptionCard from './SubscriptionCard'
// import SubscriptionPlan from './SubscriptionPlan'
// import Sidebar from './Sidebar'
// import PaymentButton from './buttons/PaymentButton'
// import { ThemeToggle } from './buttons/ToggleTheme'


interface Props {
    slug: string
}


const SmallScreenSideBar = ({ slug }: Props) => {
    const { page } = usePath()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    return (
        <nav className="">
            <PageWrapper>
                <div className="container mx-auto  flex items-center justify-end py-1">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden bg-gray-200 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-white  hover:text-white dark:hover:text-black p-2 rounded-full transition-colors duration-300 "
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed inset-y-0 left-0 z-50 w-3/4 py-3.5 max-w-sm bg-white dark:bg-gradient-to-br from-myPrimary to-mySecondary-900 transform transition-transform duration-700 ease-in-out md:hidden
                                 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} >

                    <div className={`h-full overflow-y-auto transition-opacity duration-500 
                                    ${mobileMenuOpen ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                        <div className="absolute top-0 right-0 justify-end p-4">
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className=""
                                aria-label="Close mobile menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* <ThemeToggle/> */}

                        <div className='flex flex-col h-full pt-10 gap-y-4 px-6'>
                            <SidebarItems page={page} slug={slug} />
                            <div className="px-16 py-8">
                                <Separator
                                    orientation="horizontal"
                                    className="bg-[#333336]"
                                />
                            </div>

                            <div className="px-3 flex flex-col gap-y-5">
                                <div className="flex gap-x-2">
                                    <UserAuthState />
                                    <p className="text-[#9B9CA0]">Profile</p>
                                </div>
                                <div className="flex gap-x-3">
                                    <HelpDuoToneCyan />
                                    <p className="text-[#9B9CA0]">Help</p>
                                </div>
                            </div>

                           <SubscriptionCard/>				
                        </div>

                    </div>
                </div>
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-700"
                        onClick={() => setMobileMenuOpen(false)}
                        aria-hidden="true"
                    ></div>
                )}
            </PageWrapper>
        </nav>
    )
}

export default SmallScreenSideBar