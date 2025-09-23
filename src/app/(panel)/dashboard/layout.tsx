import React from "react";
import { Sidebar } from "../../(panel)/dashboard/_components/sidebar";
import  getSession  from "@/lib/getSession";
import { redirect} from "next/navigation";
export default async function DasboardLayout({
    children,
}:{children:React.ReactNode})
{
    const session = await getSession();
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