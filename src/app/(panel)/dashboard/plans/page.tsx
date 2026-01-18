import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GridPlans } from "./_components/grid_plans";
import { getSubscription } from "@/utils/get-subscription";
import { SubscriptionDetail } from "./_components/subscription-detail";

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
                <SubscriptionDetail subscription={subscription!}/>
            )}
        </div>
    )
}