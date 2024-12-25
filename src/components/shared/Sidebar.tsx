"use client"
import { UsePath } from '@/hooks/use-path'
import React from 'react'
import SidebarItems from './SidebarItems'
import { Separator } from '../ui/separator'
import { HelpDuoToneCyan } from '@/icons/help-duotone-cyan'
import UserAuthState from "@/components/shared/buttons/UserAuthState"
import SubscriptionCard from './SubscriptionCard'
// import { ThemeToggle } from './buttons/ToggleTheme'
interface Props {
	slug: string
}

const Sidebar = ({ slug }: Props) => {
	const { page } = UsePath()
	return (
		<div className="w-64 m-3 border radial fixed left-0 bottom-0 top-0 hidden lg:inline-block border-mySecondary-400 bg-gradient-to-br from-white dark:from-black to-mySecondary-500/30 rounded-3xl overflow-hidden">
			<div className="flex flex-col gap-y-5 w-full h-full p-3 dark:bg-myPrimary bg-opacity-80 bg-clip-padding backdrop-filter backdrop--blur__safari backdrop-blur-3xl">

				<div className="text-xl font-bold flex justify-center items-center">
					<span className="text-mySecondary-400">Stream</span>Snap
				</div>

				{/* <ThemeToggle/> */}

				<SidebarItems page={page} slug={slug} />

				<div className="px-16">
					<Separator
						orientation="horizontal"
						className="bg-mySecondary-500 dark:bg-[#333336]"
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
	)
}

export default Sidebar
