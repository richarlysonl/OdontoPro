 "use server"
import prisma from "@/lib/prisma"
import { Phone } from "lucide-react"
import { z } from "zod"
const formSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido"),
    Phone: z.string().min(1, "Telefone é obrigatório"),
    date: z.date(),
    ServiceId: z.string().min(1, "Serviço é obrigatório"),
    clinicId: z.string().min(1, "Clínica é obrigatória"),
    time: z.string().min(1, "Horário é obrigatório"),
})
type FormSchema = z.infer<typeof formSchema>
export async function createNewAppointment(formData: FormSchema) {
    const schema = formSchema.safeParse(formData)
    if (!schema.success) {
        return{
            error: schema.error.issues[0].message
        }
    }
    try{
        const selectedDate = new Date(formData.date)
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth();
        const day = selectedDate.getDate();
        const appointmentDateTime = new Date(year,month, day, 0,0,0,0);
        const newAppointment = await prisma.apointment.create({
            data: {
                name: formData.name,
                email: formData.email,
                phone: formData.Phone,
                date: appointmentDateTime,
                time: formData.time, 
                serviceId: formData.ServiceId,
                userId: formData.clinicId,
            } 
        });
        return {
            data: newAppointment
        }
    }catch(err){
        console.log(err)
        return{
            error: "Erro ao criar agendamento"
        }
    }
}