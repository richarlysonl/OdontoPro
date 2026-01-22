"use server"

import { auth } from "@/lib/auth"
import { PlanDetaisInfo } from "./get-plans";
import prisma from "@/lib/prisma";
import { canCreateService } from "./canCreateService";

//perguntar se tem permissao para fazer algo
export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "EXPIRED" | "TRIAL";
interface CanPermissionProps{
    type: string
}
export interface ResultPermissionProps{
    hasPermission: Boolean;
    planId: PLAN_PROP;
    expired: Boolean;
    plan: PlanDetaisInfo | null;
}
export async function canPermission({type} : CanPermissionProps): Promise<ResultPermissionProps>{
    const session = await auth();
    if(!session?.user?.id){
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }
    }
    const subscription = await prisma.subscription.findFirst({
        where: {
            id: session.user.id
        }
    })
    switch(type){
        case "service":
            const permission = await canCreateService(subscription, session);
            return permission;
        default: 
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }   
    }
}