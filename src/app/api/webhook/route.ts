import Stripe from "stripe"
import {stripe} from "@/utils/stripe"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

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
            //ir no campo de dados e deletar a assinatura do usuário
            break;
        case "customer.subscription.updated":
            const paymentIntent = event.data.object as Stripe.Subscription
            //ir no campo de dados e atualizar a assinatura do usuário
            break;
        case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            //ir no banco de dados e criar a assinatura vinculada ao usuário
            break;
        default:
            console.log(`evento não tratado ${event.type}`)
    }
    return NextResponse.json({ received: true }, { status: 200 })
}