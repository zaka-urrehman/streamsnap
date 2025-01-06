import { AutomationDuoToneCyan, ContactsDuoToneCyan, HomeDuoToneCyan, RocketDuoToneCyan, SettingsDuoToneCyan } from "@/icons";




export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings',
]


interface PageIcon {
    [key: string]: JSX.Element
}

export const PAGE_ICON: PageIcon = {
    AUTOMATIONS: <AutomationDuoToneCyan />,
    CONTACTS: <ContactsDuoToneCyan />,
    INTEGRATIONS: <RocketDuoToneCyan />,
    SETTINGS: <SettingsDuoToneCyan />,
    HOME: <HomeDuoToneCyan />,
}