import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className='p-4 text-center border-b'>
                20% off on all products.
            </div>
            {children}
        </div>
    )
}
