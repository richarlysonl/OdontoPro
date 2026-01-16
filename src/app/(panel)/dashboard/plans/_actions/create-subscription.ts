"use server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { stripe } from "@/utils/stripe"
import { plan } from "@prisma/client"

interface SubscriptionProps {
  type: plan
}

export async function createSubscription({ type }: SubscriptionProps) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return { sessionId: "", error: "Usuário não autenticado" }
  }

  const findUser = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!findUser) {
    return { sessionId: "", error: "Usuário não encontrado" }
  }

  let customerId = findUser.stripe_customer_id

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: findUser.email,
    })

    await prisma.user.update({
      where: { id: userId },
      data: { stripe_customer_id: stripeCustomer.id },
    })

    customerId = stripeCustomer.id
  }

  const priceId =
    type === plan.BASIC
      ? process.env.STRIPE_PLAN_BASIC
      : process.env.STRIPE_PLAN_PROFESSIONAL

  if (!priceId) {
    return { sessionId: "", error: "Plano não configurado" }
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    billing_address_collection: "required",
    allow_promotion_codes: true,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
    metadata: { plan: type },
  })

  return {
    sessionId: checkoutSession.id,
    url: checkoutSession.url!,
  }
}
