import { auth } from "@/lib/auth";
    import { redirect } from "next/navigation";
import { ServiceContent } from "./_components/service-content";
export default async function Services(){
        const session = await auth()
        if (!session) {
            redirect("/")
        }
    return(
        <div>
        <ServiceContent userId ={session.user?.id}/>
        </div>
    )
}