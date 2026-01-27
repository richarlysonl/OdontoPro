import React from "react";
import { Sidebar } from "../../(panel)/dashboard/_components/sidebar";
import { auth } from "@/lib/auth";
import { redirect} from "next/navigation";
export default async function DasboardLayout({
    children,
}:{children:React.ReactNode})
{
    const session = await auth();
            if(!session)
                redirect("/");
    return(
        <>
        <Sidebar>
        {children}
        </Sidebar>
        </>
    )
}