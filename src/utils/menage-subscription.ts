import prisma from "@/lib/prisma";
import Stripe from "stripe";
import { stripe } from "./stripe";
import { plan } from "@prisma/client";
/**
 * Gerencia a assinatura do usuário no banco de dados com base nos eventos do Stripe.
 */
export async function manageSubscription(
    subscriptionId: string,
    customerId: string,
    createAction= false,
    deleteAction= false,
    type?: plan
){
    //buscar o usuário no banco de dados pelo customerId
    //salvar no banco de dados a assinatura vinculada ao usuário
    const user = await prisma.user.findFirst({
        where:{
            stripe_customer_id: customerId
        }
        })
        if(!user){
            return Response.json({error: "User not found"}, {status: 400})
        }
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const subscriptionData = {
            id: subscription.id,
            userId: user.id,
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            plan: type ?? "BASIC",
        }
        if(subscriptionId && deleteAction){
            await prisma.subscription.deleteMany({
                where:{
                    id: subscriptionId
                }
            })
            return
        }
        if(createAction){
            try{
                await prisma.subscription.create({
                    data: subscriptionData
                })
            }catch(err){
                console.log("Error creating subscription:", err)
            }
        }else{
            try{
                await prisma.subscription.findFirst({
                    where:{
                        id: subscriptionId
                    }
                })
                if(!subscription){
                    return
                }
                await prisma.subscription.update({
                    where:{
                        id: subscriptionId
                    },
                    data: {
                        status: subscription.status,
                        priceId: subscription.items.data[0].price.id,
                    }
                })
            }
            catch(err){
                console.log("Error updating subscription:", err)
            }
        }
}