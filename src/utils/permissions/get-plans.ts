"use server"
import { plan } from "@prisma/client"
import { PlanProps } from "../plans"
export interface PlanDetaisInfo{
    maxServices: number;
}
const PLAN_LIMITS: PlanProps = {
    BASIC: {
        maxServices: 3,
    },
    PROFESSIONAL:{
        maxServices: 50,
    }
}
export async function getPlans(planId: plan){
    return PLAN_LIMITS[planId];
}