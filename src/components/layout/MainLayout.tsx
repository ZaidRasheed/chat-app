import React from 'react'
import SideBar from './SideBar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen h-screen">
            <div className="flex h-full">
                <SideBar />
                {children}
            </div>
        </div>

    )
}
