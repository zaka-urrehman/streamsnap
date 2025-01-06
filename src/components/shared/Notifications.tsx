import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'

export const Notifications = () => {
  return (
    <Button className="bg-white  size-11 rounded-full">
      <Bell
        color="#06b6d4"
        fill="#06b6d4"
        // className='text-mySecondary-500'
      />
    </Button>
  )
}
