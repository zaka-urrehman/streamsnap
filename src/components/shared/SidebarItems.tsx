"use client"
import { SIDEBAR_MENU } from '@/constants/Menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    page: string
    slug: string
}

const SidebarItems = ({ page, slug }: Props) => {
  
    return SIDEBAR_MENU.map((item) => (
        <Link
            key={item.id}
            href={`/dashboard/${slug}/${item.label === 'home' ? '/' : item.label}`}
            className={cn(
                'flex gap-x-2 p-3 capitalize rounded-full ',
                page === item.label && 'bg-mySecondary-200 dark:bg-[#164e63] border border-mySecondary-500 ',
                page === slug && item.label === 'home'
                    ? 'bg-mySecondary-200 dark:bg-[#164e63] border border-mySecondary-500 '
                    : 'text-[#9B9CA0]'
            )}
        >
            {/* {theme != 'dark' && (page === item.label || (item.label === 'home' && page === slug)) ? item.icon.white : item.icon.cyan} */}
            {item.icon.cyan}
            {item.label}
        </Link>
    ))
}

export default SidebarItems
