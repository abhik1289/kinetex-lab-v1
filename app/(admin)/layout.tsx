import React from 'react';
import "../globals.css"

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            >
            <body className="min-h-full flex flex-col">
            <div>{children}</div>
        </body>
    </html >
  )
}

export default AdminLayout