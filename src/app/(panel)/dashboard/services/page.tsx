import { auth } from "@/lib/auth";
    import { redirect } from "next/navigation";
import { ServiceContent } from "./_components/service-content";
import { Suspense } from "react";
export default async function Services(){
        const session = await auth()
        if (!session) {
            redirect("/")
        }
    return(
        <div>
            <Suspense fallback={<div>carregando...</div>}>
                <ServiceContent userId ={session.user?.id}/>
            </Suspense>
        </div>
    )
}