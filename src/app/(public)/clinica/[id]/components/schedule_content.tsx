"use client"
import Image from "next/image";
import imgTest from "../../../../../../public/foto1.png"
import { MapPin } from "lucide-react";
import { Prisma } from '@prisma/client';
import { useApointmentForm, appointmentFormData } from "./schedule_form";
import { Button } from "@/components/ui/button";
import { Form,FormControl,FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: { service: true; subscriptions: true };
}>;

interface ScheduleContentProps {
    clinic: UserWithServiceAndSubscription
    }
export function ScheduleContent({clinic}: ScheduleContentProps) {
    const form = useApointmentForm();
    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-32 bg-emerald-500" />
            <section className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <article className="flex flex-col items-center">
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white -mt-24 mb-8">
                            <Image
                                src={clinic.image || imgTest}
                                alt="foto da clinica"
                                className="object-cover"
                                fill
                            />
                        </div>
                        <h1 className="text 2xl font-bold mb-2">
                            {clinic.name || "Nome da clinica"}
                            </h1>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-5 w-5"/>
                            <span>
                                {clinic.address ? clinic.address : "endereco nao informado"}
                            </span>
                        </div>
                    </article>
                </div>
            </section>

            {/* Formulario de agendamento */}
            <Form {...form}>
                <form 
                className="mx-2 space-y-6 bg-white  p-6 border rounded-md shadow-sm"
                >
                    <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <div>
                            <FormItem className="my-2">
                                <FormLabel className="font-semibold">nome Completo</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input
                                        id="name"
                                        placeholder="digite seu nome"
                                        {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        </div>
                    )}
                    />
                </form>
            </Form>

        </div>
    )
}