import { InstagramDuoToneCyan, SalesForceDuoToneCyan } from "@/icons"

type Props = {
    title: string
    icon: React.ReactNode
    description: string
    strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
    {
        title: 'Connect Instagram',
        description:
            'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
        icon: <InstagramDuoToneCyan/>,
        strategy: 'INSTAGRAM',

    },
    // {
    //     title: 'Connect Salesforce',
    //     description:
    //         'Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices',
    //     icon: <SalesForceDuoToneCyan />,
    //     strategy: 'CRM',
    // },
]