import { Button } from "@/components/ui/button";
import { Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter
 } from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { Subscription } from "@prisma/client";
import { toast } from "sonner";


interface SubscriptionDetailProps {
    subscription: Subscription
}
export function SubscriptionDetail( {subscription}: SubscriptionDetailProps) {
    const subscriptionInfo = subscriptionPlans.find( plan => plan.id === subscription.plan);
    async function handleMenageSubscription() {
        console.log("Gerenciar assinatura");
    }
    return (
        <Card className="w-full mx-auto">
            <CardHeader>
                <CardTitle>Plano atual</CardTitle>
                <CardDescription>Informações sobre sua assinatura atual</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg md:text-xl">
                    {subscription.plan === 'BASIC'? "BASIC" : "PROFISSIONAL"}
                </h3>
                <div className="bg-green-500 text-white w-fit px-4 py-1 rounded-md">
                    {subscription.status === "active" ? "ATIVO" : "INATIVO"}
                </div>
                </div>
                <ul className="list-disc list-inside space-y-2">
                    {subscriptionInfo && subscriptionInfo.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button
                onClick={handleMenageSubscription}
                >
                    Gerenciar Assinatura
                </Button>
            </CardFooter>
        </Card>
        )
}