"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export const appointmentSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    email: z.string().email({ message: "Email inválido" }),
    serviceId: z.string().min(1, { message: "Serviço é obrigatório" }),
    date: z.date(),
})
export type appointmentFormData= z.infer<typeof appointmentSchema>

export function useApointmentForm() {
    return useForm<appointmentFormData>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: "",
            status: "active",
            email: "",
            serviceId: "",
            date: new Date()
        }   
    })
}