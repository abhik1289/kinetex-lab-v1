"use client"

import KinetexFooter from '@/components/common/footer';
import Navbar from '@/components/common/Navbar';
import { usePathname } from 'next/navigation'
import React from 'react'

function MainLayout({ children }: {
    children: React.ReactNode
}) {

    const path = usePathname();

    console.log(path)

    if (path === "/event-kbc") {
        return (<>
            {children}
        </>)
    } else {



        return (
            <>
                <Navbar />
                {children}
                <KinetexFooter />
            </>


        )
    }
}
export default MainLayout