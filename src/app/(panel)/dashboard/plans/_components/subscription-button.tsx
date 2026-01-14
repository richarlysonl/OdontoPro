"use client"
import { Button } from "@/components/ui/button"
import { plan } from "@prisma/client"
import { createSubscription } from "../_actions/create-subscription"
import { toast } from "sonner"
import { getStripeJs } from "@/utils/stripe-js"
interface SubscriptionButtonProps{
    type: plan
}

export function SubscriptionButton({type}:SubscriptionButtonProps) {
    async function handleCreateBiling(){
        const {sessionId, error, url} = await createSubscription({type:type})
        console.log("seessionID: ",sessionId)
        if(error){
            toast.error(error);
            return error;
        }
        const stripe = await getStripeJs();
        if(stripe && url){
            window.location.href = url;
        }
    }   
    return (
        <Button className={` w-full ${type === "PROFESSIONAL" && "bg-emerald-500 hover:bg-emerald-400"}`}
        onClick={handleCreateBiling}
        >
            ativar assinatura
        </Button>
    )
}