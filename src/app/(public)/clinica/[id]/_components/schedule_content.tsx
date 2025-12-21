"use client"
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { time } from "console";
import { ScheduleTimeList } from "./schedule_time_list";
import { createNewAppointment } from "../_actions/create_appointment";
import { toast } from "sonner";
// @ts-ignore
type UserWithServiceAndSubscription = Prisma.UserGetPayload<{
  include: { service: true; subscriptions: true };
}>;

interface ScheduleContentProps {
    clinic: UserWithServiceAndSubscription
    }
export interface timeSlot {
    time: string;
    available: boolean;
}
export function ScheduleContent({clinic}: ScheduleContentProps) {
    const form = useApointmentForm();
    const {watch} = form;
    const selectedDate = watch("date");
    const selectedServiceId = watch("serviceId");
    const [selectedTime,setSelectedTime] = useState("");
    const [availableTimes,setAvailableTimes] = useState<timeSlot[]>([]);
    const [loadingSlots,setLoadingSlots] = useState(false);

    //quais os horarios bloqueados
    const [blockedTimes,setBlockedTimes] = useState<string[]>([]);
    const fetchBlockedTimes = useCallback(async (date:Date): Promise<string[]> => {
        setLoadingSlots(true);
        try{
            const dateString = date.toISOString().split('T')[0];
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/schedule/get-appointments?userId=${clinic.id}&date=${dateString}`);
            const data = await response.json();
            setLoadingSlots(false);
            return data; //retornar o array de horarios bloqueados do dia
        }catch(err){
            console.log(err);
            setLoadingSlots(false);
            return [];
        }
    },[clinic.id] );
    useEffect(() => {
        if(selectedDate){
            //buscar horarios bloqueados
            fetchBlockedTimes(selectedDate).then((blocked) =>{
                setBlockedTimes(blocked);
                const times = clinic.times || [];
                const finalSlots:timeSlot[] = times.map((time:string) => ({
                    time: time,
                    available: !blocked.includes(time)
                }))

                setAvailableTimes(finalSlots);

                //vericar se o horario selecionado ainda esta disponivel, se nao limpar a selecao
                const stillAvailable = finalSlots.find(
                    slot => slot.time === selectedTime && slot.available
                );
                if(!stillAvailable){
                    setSelectedTime("");
                }
            })
        }
    }, 
    [selectedDate,clinic.times, fetchBlockedTimes, selectedTime]);
    //funcao para buscar horarios bloqueados (via fetch HTTP)
    async function HandleRegisterApointment(formData: appointmentFormData) {
        if(!selectedTime){
            alert("por favor selecione um horario para o agendamento");
            return;
        }
        const response = await createNewAppointment({
            name: formData.name,
            email: formData.email,
            Phone: formData.phone,
            date: formData.date,
            ServiceId: formData.serviceId,
            clinicId: clinic.id,
            time: selectedTime,
        });
        if(response.error){
            toast.error(response.error);
            console.log(response.error);
            return;
        }
        toast.success("Agendamento criado com sucesso!");
        form.reset();
        setSelectedTime("");
    }
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
                    onSubmit={form.handleSubmit(HandleRegisterApointment)}
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

                                                    {/* @ts-ignore*/}
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

                        {selectedServiceId && (
                            <div>
                                <Label className=" font-semibold space-y-2">Selecione um horário:</Label>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    {loadingSlots ? (
                                        <p>Carregando horários disponíveis...</p>
                                    ) : availableTimes.length === 0 ? (
                                        <p>Nenhum horário disponível para a data selecionada.</p>
                                    ) : (
                                        <ScheduleTimeList 
                                            onSelectTime={(time) => setSelectedTime(time)}
                                            clinicTimes={clinic.times}
                                            blockedTimes={blockedTimes}
                                            availableTimesSlots={availableTimes}
                                            selectedTime={selectedTime}
                                            selectedDate={selectedDate}
                                            requiredSlots={
                                                clinic.services.find(service=> service.id ===  selectedServiceId) ? Math.ceil(
                                                    clinic.services.find(service=> service.id ===  selectedServiceId)!.duration / 30
                                                ) : 1
                                                }/>
                                             )
                                            }
                                </div>
                            </div>
                        )}

                        {clinic.status ? (
                            <Button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-400"
                        disabled={!watch("name") || !watch("email") || !watch("phone") || !watch("date")}
                        >
                            Agendar
                        </Button>
                        ): (
                            <p
                            className="bg-red-500 text-white rounded-md text-center px-4 py-2"
                            >
                                clinica fechada neste momento</p>
                        )
                        }
                    </form>
                </Form>
            </section>

        </div>
    )
}