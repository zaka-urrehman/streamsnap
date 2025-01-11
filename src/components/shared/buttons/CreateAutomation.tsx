'use client'

import { Button } from '@/components/ui/button'
import React, { useMemo } from 'react'
import Loader from '@/components/shared/Loader'
import { AutomationDuoToneCyan } from '@/icons'
import { useCreateAutomation } from '@/hooks/use-automations'
import { v4 } from 'uuid'

type Props = {}

const CreateAutomation = (props: Props) => {
    const mutationId = useMemo(() => v4(), [])
    const { isPending, mutate } = useCreateAutomation(mutationId)

    return (
        <Button
            className="lg:px-10 py-6  hover:opacity-80 text-white rounded-full font-medium bg-gradient-to-br from-mySecondary-200 dark:from-mySecondary-300 via-mySecondary-500 dark:via-mySecondary-700 to-mySecondary-200 dark:to-mySecondary-300 max-md:bg-white"
            onClick={() =>
                mutate({
                    name: 'Untitled',
                    id: mutationId,
                    createdAt: new Date(),
                    keywords: [],
                })
            }
        >
            <Loader state={false}>
                <div className='sm:hidden'>
                    <AutomationDuoToneCyan />
                </div>
                <p className="sm:inline hidden">Create an Automation</p>
            </Loader>
        </Button>
    )
}

export default CreateAutomation
