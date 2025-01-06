import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'


const Search = () => {
  return (
    <div className="flex px-4 py-1 max-w-lg items-center flex-1 overflow-hidden gap-x-2 border-[1px] border-mySecondary-500 rounded-full">
      <SearchIcon className='text-mySecondary-500' />
      <Input
        placeholder="Search by name or email"
        className="border-none  focus:ring-0  flex-1 "
      />
    </div>
  )
}

export default Search
