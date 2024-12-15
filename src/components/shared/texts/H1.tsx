import React from 'react'

const H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-center lg:text-left max-w-3xl mx-auto lg:mx-0 leading-tight mb-6">
      {children}
      {/* <span className="block text-mySecondary-400">Smarter Growth, Seamless Engagement!</span> */}
    </h1>
  )
}

export default H1