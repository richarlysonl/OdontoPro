import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid_plans";
import { getSubscription } from "@/utils/get-subscription";

export default async function Plans(){
     const session = await auth();
            if(!session)
                redirect("/");
            const subscription = await getSubscription({userId: session?.user?.id!})
    return(
        <div>
            {subscription?.status !== "active" && (
            <GridPlans/>
            )}
            {subscription?.status == "active" && (
                <h1>Você tem uma assinatura ativa</h1>
            )}
        </div>
    )
}