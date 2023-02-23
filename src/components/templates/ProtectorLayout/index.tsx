import React from 'react';
import {useSession} from "next-auth/react";
import {type Role} from "@prisma/client";

function DropshiperLayout({children, access = []}: {children: React.ReactNode, access: Role[]}) {
    const session = useSession()
    if (session.status === 'unauthenticated') window.location.replace('/login');
    if (access.length && !access.includes(session.data?.user.role || 'PUBLIC')) return (
        <div>Kamu tidak memiliki izin untuk mengakses ini.</div>
    );
    return (
        <div>{children}</div>
    );
}

export default DropshiperLayout;
