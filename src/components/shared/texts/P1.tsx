import React from 'react'

const P1 = ({children}: {children: React.ReactNode}) => {
    return (
        <p className="mt-4 text-xl text-gray-400">
            {children}
        </p>
    )
}

export default P1