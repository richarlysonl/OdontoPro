import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid_plans";

export default async function Plans(){
     const session = await auth();
            console.log(session?.user?.name);
            if(!session)
                redirect("/");
    return(
        <div>
            <GridPlans/>
        </div>
    )
}