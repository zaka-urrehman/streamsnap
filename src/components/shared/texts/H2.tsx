import React from 'react'

const H2 = ({children}: {children: React.ReactNode}) => {
    return (
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ">
            {children}
        </h2>
    )
}

export default H2