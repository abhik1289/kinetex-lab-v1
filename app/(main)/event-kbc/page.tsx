import KbcFooter from '@/components/event-kbc/kbc-footer'
import KbcHeader from '@/components/event-kbc/kbc-header'
import KbcHero from '@/components/event-kbc/kbc-hero'
import React from 'react'

function page() {
    return (
        <div>
            <KbcHeader />
            <KbcHero />
            <KbcFooter />
        </div>
    )
}

export default page