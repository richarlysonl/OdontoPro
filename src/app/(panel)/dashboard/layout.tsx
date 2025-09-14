import React from "react";
import { Sidebar } from "../../(panel)/dashboard/_components/sidebar";

export default function DasboardLayout({
    children,
}:
{children:React.ReactNode}){
    return(
        <>
        <Sidebar>
        {children}
        </Sidebar>
        </>
    )
}