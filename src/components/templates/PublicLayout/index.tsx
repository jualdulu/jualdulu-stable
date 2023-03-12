import React from 'react';
import Header from "~/components/organisms/Header";

function PublicLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default PublicLayout;