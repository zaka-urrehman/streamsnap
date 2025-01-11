import {
    MutationFunction,
    MutationKey,
    useMutation,
    useMutationState,
    useQueryClient,
} from '@tanstack/react-query'
import { toast } from 'sonner'

// creates a mutation based on mutation Fn
export const useMutationData = (
    mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: string,
    onSuccess?: () => void
) => {
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationKey,
        mutationFn,
        onSuccess: (data) => {
            if (onSuccess) onSuccess()
            return toast(data?.status === 200 ? 'Success' : 'Error', {
                description: data.data,
            })
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
    })

    return { isPending, mutate }
}

// tracks the state of a mutation and returns the latest variable (used for optimistic updates)
export const useMutationDataState = (mutationKey: MutationKey) => {
    const data = useMutationState({
        filters: { mutationKey },
        select: (mutation) => {
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            }
        },
    })

    const latestVariable = data[data.length - 1]
    return { latestVariable }
}