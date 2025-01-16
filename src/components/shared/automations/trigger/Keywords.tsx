import { Input } from '@/components/ui/input'
import { useKeywords } from '@/hooks/use-automations'
import { useMutationDataState } from '@/hooks/use-mutation-data'
import { useQueryAutomation } from '@/hooks/user-queries'
import { X } from 'lucide-react'
import React from 'react'
import Loader from '../../Loader'

type Props = {
    id: string
}

export const Keywords = ({ id }: Props) => {
    const { onValueChange, keyword, onKeyPress, deleteMutation } = useKeywords(id)
    const { latestVariable } = useMutationDataState(['add-keyword'])
    const { data }: any = useQueryAutomation(id)

    return (
        <div className="bg-background-80 flex flex-col gap-y-3 p-3 rounded-xl">
            <p className="text-sm text-text-secondary">
                Add words that trigger automations
            </p>
            <div className="flex flex-wrap justify-start gap-2 items-center">
                {data?.data?.keywords &&
                    data?.data?.keywords.length > 0 &&
                    data?.data?.keywords.map(
                        (word: any) =>
                            word.id !== latestVariable.variables.id && (
                                <div
                                    className=" bg-gray-600 text-white flex items-center group gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full"
                                    key={word.id}
                                >
                                    <p>{word.word}</p>
                                    <X
                                        className="cursor-pointer hidden group-hover:block duration-300"
                                        size={16}
                                        onClick={() => deleteMutation({id: word?.id})}
                                    />
                                </div>
                            )
                    )}
                {latestVariable && latestVariable.status === 'pending' && (
                    <div className="bg-background-90 flex items-center gap-x-2 capitalize text-text-secondary py-1 px-4 rounded-full">
                        <Loader state={true}>
                            <></>
                        </Loader>
                        {latestVariable.variables.keyword}
                    </div>
                )}
                <Input
                    placeholder="Add keyword..."
                    style={{
                        width: Math.min(Math.max(keyword.length || 10, 2), 50) + 'ch',
                    }}
                    value={keyword}
                    className="p-0 bg-transparent ring-0 border border-gray-300 px-2 rounded-full min-w-32"
                    onChange={onValueChange}
                    onKeyUp={onKeyPress}
                />
            </div>
        </div>
    )
}
export default Keywords
