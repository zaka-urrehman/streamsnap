'use client'
import { useQueryAutomation } from '@/hooks/user-queries'
import { Separator } from '@/components/ui/separator'
import { useTriggers } from '@/hooks/use-automations'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Loader from '@/components/shared/Loader'
import ActiveTrigger from './ActiveTrigger'
import Keywords from './Keywords'
import TriggerButton from '../../buttons/TriggerButton'
import { AUTOMATION_TRIGGERS } from '@/constants/automation'
import ThenButton from '../then/ThenButton'
import { useMutationDataState } from '@/hooks/use-mutation-data'

type Props = {
    id: string
}

const Trigger = ({ id }: Props) => {
    const { types, onSetTrigger, onSaveTrigger, isPending } = useTriggers(id)
    const { data }: any = useQueryAutomation(id)
    const { latestVariable } = useMutationDataState(['user-automation'])


    if (data?.data && data?.data?.trigger?.length > 0) {
        return (
            <div className="flex flex-col ga-y-6 items-center ">
                <ActiveTrigger
                    type={data.data.trigger[0].type}
                    keywords={data.data.keywords}
                />

                {data?.data?.trigger.length > 1 && (
                    <>
                        <div className="relative w-6/12 my-4">
                            <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">
                                or
                            </p>
                            <Separator
                                orientation="horizontal"
                                className="border-muted border-[1px]"
                            />
                        </div>
                        <ActiveTrigger
                            type={data.data.trigger[1].type}
                            keywords={data.data.keywords}
                        />
                    </>
                )}

                {!data.data.listener && <ThenButton id={id} />}
            </div>
        )
    }
    return (
        <TriggerButton label="Add Trigger">
            <div className="flex flex-col gap-y-2">
                {AUTOMATION_TRIGGERS.map((trigger: any) => (
                    <div
                        key={trigger.id}
                        onClick={() => onSetTrigger(trigger.type)}
                        className={cn(
                            'hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-2 gap-y-2',
                            !types?.find((t: any) => t === trigger.type)
                                ? 'bg-background-80'
                                : 'font-medium bg-gradient-to-br from-mySecondary-500 to to-blue-800'
                        )}
                    >
                        <div className="flex gap-x-2 items-center">
                            {trigger.icon}
                            <p className="font-bold">{trigger.label}</p>
                        </div>
                        <p className="text-sm font-light">{trigger.description}</p>
                    </div>
                ))}
                <Keywords id={id} />
                <Button
                    onClick={onSaveTrigger}
                    disabled={types?.length === 0}
                    className=" font-medium  bg-gradient-to-br from-mySecondary-500 to to-blue-800 text-white"
                >
                    <Loader state={isPending}>Create Trigger</Loader>
                </Button>
            </div>
        </TriggerButton>
    )
}

export default Trigger
