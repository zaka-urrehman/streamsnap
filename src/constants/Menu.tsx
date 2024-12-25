import {
    AutomationDuoToneCyan, HomeDuoToneCyan, RocketDuoToneCyan, SettingsDuoToneCyan,
    AutomationDuoToneWhite, HomeDuoToneWhite, RocketDuoToneWhite, SettingsDuoToneWhite
} from '@/icons'
import { v4 as uuid } from 'uuid'

interface SidebarMenuProps {
    id: string
    label: string
    icon: {
        cyan: React.ReactNode
        white: React.ReactNode
    }
}

export const SIDEBAR_MENU: SidebarMenuProps[] = [
    {
        id: uuid(),
        label: 'home',
        icon: {
            cyan: <HomeDuoToneCyan />,
            white: <HomeDuoToneWhite />,
        },
    },
    {
        id: uuid(),
        label: 'automations',
        icon: {
            cyan: <AutomationDuoToneCyan />,
            white: <AutomationDuoToneWhite />,
        },
    },
    {
        id: uuid(),
        label: 'integrations',
        icon: {
            cyan: <RocketDuoToneCyan />,
            white: <RocketDuoToneWhite />,
        },
    },
    {
        id: uuid(),
        label: 'settings',
        icon: {
            cyan: <SettingsDuoToneCyan />,
            white: <SettingsDuoToneWhite />,
        },
    },
]
