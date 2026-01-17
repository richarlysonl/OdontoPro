import Stripe from "stripe"
import {stripe} from "@/utils/stripe"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { manageSubscription } from "@/utils/menage-subscription"
import { plan } from "@prisma/client"
import { revalidatePath } from "next/cache"
export const POST = async (request: Request) => {
    const signature = request.headers.get("stripe-signature") || ""
    if (!signature) {
        return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 })
    }
    const text = await request.text()
    const event = stripe.webhooks.constructEvent(
        text, 
        signature,
        process.env.STRIPE_SECRET_WEBHOOK_KEY as string
    )
    switch (event.type) {
        case "customer.subscription.deleted":
            const payment = event.data.object as Stripe.Subscription
            await manageSubscription(
                payment.id, 
                payment.customer.toString(),
                false,
                true)    
            break;
        case "customer.subscription.updated":
            const paymentIntent = event.data.object as Stripe.Subscription
            await manageSubscription(
                paymentIntent.id, 
                paymentIntent.customer.toString(),
                false,
            )    
            break;
        case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            const type = checkoutSession.metadata?.type ? checkoutSession.metadata?.type : "BASIC";
            if(checkoutSession.subscription && checkoutSession.customer){
                await manageSubscription(
                    checkoutSession.subscription.toString(), 
                    checkoutSession.customer.toString(),
                    true,
                    false,
                    type as plan
                )  
            }
            break;
        default:
            console.log(`evento não tratado ${event.type}`)
    }
    revalidatePath("/dashboard/plans");
    return NextResponse.json({ received: true }, { status: 200 })
}