import React from 'react'
import ReactQueryProvider from './ReactQueryProvider'

const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
        </div>
    )
}

export default RootProvider