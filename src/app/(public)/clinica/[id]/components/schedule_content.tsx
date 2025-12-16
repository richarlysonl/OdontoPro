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
import { formatPhone } from "@/utils/formatPhone";
import { DateTimePicker } from "./date_picker";
import { date } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { match } from "node:assert";
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

            <section className="max-w-2xl mx-auto w-full mt-6">
                {/* Formulario de agendamento */}
                <Form {...form}>
                    <form 
                    className="mx-2 space-y-6 bg-white  p-6 border rounded-md shadow-sm"
                    >
                        <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">nome Completo</FormLabel>
                                    <FormControl>
                                            <Input
                                            id="name"
                                            placeholder="digite seu nome"
                                            {...field}
                                            />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">digite seu email:</FormLabel>
                                    <FormControl>
                                            <Input
                                            id="email"
                                            placeholder="digite seu email"
                                            {...field}
                                            />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                        <FormField
                        control={form.control}
                        name="phone"
                        render={({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">digite seu telefone:</FormLabel>
                                    <FormControl>
                                            <Input
                                            {...field}
                                            id="phone"
                                            placeholder="(xx) xxxxx-xxxx"
                                            onChange={(e) => {
                                                const formattedValue = formatPhone(e.target.value);
                                                field.onChange(formattedValue)
                                            }}  
                                            />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                        <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                                <FormItem className="flex items-center gap-2 space-y-1">
                                    <FormLabel className="font-semibold">data do agendamento:</FormLabel>
                                    <FormControl>
                                            <DateTimePicker
                                                initialDate={new Date()}
                                                className="rounded border w-full p-2"
                                                onChange={(date) => {
                                                    if(date){
                                                        field.onChange(date);
                                                    }
                                                }}
                                            />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                        <FormField
                        control={form.control}
                        name="serviceId"
                        render={({field}) => (
                                <FormItem className="flex items-center gap-2 space-y-1">
                                    <FormLabel className="font-semibold">Serviço:</FormLabel>
                                    <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue="">
                                                <SelectTrigger className="w-full border rounded p-2">
                                                    <SelectValue placeholder="Selecione um serviço"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {clinic.services.map((service) => (
                                                        <SelectItem key={service.id} value={service.id}>
                                                            {service.name} - R$ {service.price.toFixed(2)}

                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                    </form>
                </Form>
            </section>

        </div>
    )
}