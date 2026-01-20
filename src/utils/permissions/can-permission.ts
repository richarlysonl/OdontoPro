"use server"

import { auth } from "@/lib/auth"
import { PlanDetaisInfo } from "./get-plans";
import prisma from "@/lib/prisma";

//perguntar se tem permissao para fazer algo
export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "EXPIRED" | "TRIAL";
interface CanPermissionProps{
    type: string
}
interface ResultPermissionProps{
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
            //verificar se o usuario tem permissao para criar um servico com base no plano
            
        default: 
        return {
            hasPermission: false,
            planId: "EXPIRED",
            expired: true,
            plan: null
        }   
    }
}