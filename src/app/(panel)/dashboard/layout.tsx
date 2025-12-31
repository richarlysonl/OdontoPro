import React from "react";
import { Sidebar } from "../../(panel)/dashboard/_components/sidebar";
import { auth } from "@/lib/auth";
import { redirect} from "next/navigation";
export default async function DasboardLayout({
    children,
}:{children:React.ReactNode})
{
    const session = await auth();
            //console.log(session?.user?.name);
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