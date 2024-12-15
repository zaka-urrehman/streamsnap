import Homepage from '@/components/pages/Homepage'
import Hero from '@/components/shared/Hero'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

export default function Home() {
  return (

    <main>
      <Homepage/>
    </main>
  )
}

