"use client"
import { Button } from "@/components/ui/button"
import { plan } from "@prisma/client"
import { createSubscription } from "../_actions/create-subscription"
interface SubscriptionButtonProps{
    type: plan
}

export function SubscriptionButton({type}:SubscriptionButtonProps) {
    async function handleCreateBiling(){
        const response = await createSubscription({type: type})
    }   
    return (
        <Button className={` w-full ${type === "professional" && "bg-emerald-500 hover:bg-emerald-400"}`}
        onClick={handleCreateBiling}
        >
            ativar assinatura
        </Button>
    )
}