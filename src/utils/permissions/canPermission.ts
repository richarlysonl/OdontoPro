"use server"

import { auth } from "@/lib/auth"
import { PlanDetaisInfo } from "./get-plans";
import prisma from "@/lib/prisma";
import { canCreateService } from "./canCreateService";

//perguntar se tem permissao para fazer algo
export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "EXPIRED" | "TRIAL";
type TypeCheck = "service";
interface CanPermissionProps{
    type: TypeCheck;
}
export interface ResultPermissionProps{
    hasPermission: boolean;
    planId: PLAN_PROP;
    expired: boolean;
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
            userId: session.user.id
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