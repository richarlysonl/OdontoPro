"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { stripe } from "@/utils/stripe"
import { plan } from "@prisma/client"

interface SubstriptionProps{
    type:plan
}
export async function createSubscription({type}: SubstriptionProps) {
    const session = await auth();
    const userId = session?.user?.id;
    if(!userId)
        return {
            sessionId: "",
            error: "falha ao ativar plano"
        }
        return{
            sessionId: "123"
        }
}