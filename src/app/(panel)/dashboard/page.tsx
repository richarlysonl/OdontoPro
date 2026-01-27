import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { redirect} from "next/navigation";
import { ButtonCopyLink } from "./_components/buton-copy-link";
import { Reminders } from "./_components/reminder/reminders";
import { Appointments } from "./_components/appointments/appointments";
import { checkSubscription } from "@/utils/permissions/checkSubscription";
import { LabelSubscription } from "@/components/ui/label-subscription";

export default async function dashboard() {
    const session = await auth();
        if(!session)
            redirect("/");
        const subscriptionStatus = await checkSubscription(session?.user?.id!);
    return (
        <main>
            <div className="space-x-2 flex items-center justify-end">
                <Link href={`/clinica/${session?.user?.id}`}
                target="_blank"
                >
                    <Button className="bg-emerald-500 hover:bg-emerald-400 flex-1 md:flex-[0]">
                        <Calendar className="w-5 h-5"/>
                        <span className="ml-2">Agendar Consulta</span>
                    </Button>
                </Link>
            <ButtonCopyLink userId={session.user?.id!}/> 
            </div>
            {subscriptionStatus.subscriptionStatus === "EXPIRED" && (
                <LabelSubscription expired={true}/>
            )}
            {subscriptionStatus.subscriptionStatus === "TRIAL" && (
                <div className="bg-green-500 text-white text-sm md:text-base px-3 py-2 my-2 rounder-md">
                    <p>
                        {subscriptionStatus.message}
                    </p>
                </div>
            )}
            { subscriptionStatus.subscriptionStatus !== "EXPIRED" && (
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 mt-4">
            <Appointments userId={session.user?.id!}/>
            <Reminders userId={session.user?.id!}/>
            </section>
        )}
        
        </main>
    );
} 
