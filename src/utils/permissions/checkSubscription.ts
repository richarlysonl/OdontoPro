"use server"

import prisma from "@/lib/prisma"
import {addDays, isAfter,differenceInDays} from "date-fns"
import { TRIAL_DAYS } from "./trial-limits"

export async function checkSubscription(userId: string){
    const user = await prisma.user.findFirst({
        where: {
            id:userId
        },
        include: {
            subscription: true
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    if(user.subscription && user.subscription.status === "ACTIVE"){
        return {
            subscriptionStatus: "ACTIVE",
            message: "assinatura ativa",
            planId: user.subscription.plan
        }
    }
    const trialEndDate = addDays(user.createdAt, TRIAL_DAYS);
    if(isAfter(new Date(), trialEndDate)){
        return {
            subscriptionStatus: "EXPIRED",
            message: "perido de teste expirado",
            planId: "TRIAL"
        }
    }
    const daysRemaining = differenceInDays(trialEndDate, new Date());
    return {
            subscriptionStatus: "TRIAL",
            message: `você está no período de teste. faltam apenas ${daysRemaining} dias.`,
            planId: "TRIAL"
        }
}