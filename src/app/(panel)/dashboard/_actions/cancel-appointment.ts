"use server"
import prisma from "@/lib/prisma";
import {success, z} from "zod";
import { revalidatePath } from "next/cache";
import { Appointments } from "../_components/appointments/appointments";
import { auth } from "@/lib/auth";
const formSchema = z.object({
    AppointmentId: z.string(/*{errorMap: () => ({message: "ID do lembrete é obrigatório"})}*/).min(1, "ID do agendamento é obrigatório"),
});
type FormSchema = z.infer<typeof formSchema>;
export async function cancelAppointment(formData: FormSchema) {
        const schema = formSchema.safeParse(formData)
        if(!schema.success){
            return{
                error: schema.error.issues[0]?.message
            }
        }
        const session = await auth();
        if(!session?.user?.id)
            return{
        error: "usuario não encontrado"
        }
        try{
            await prisma.appointment.delete({
                where:{
                    id:formData.AppointmentId,
                    userId:session.user?.id
                }
            })
            revalidatePath("/dashboard")
            return{
                data:"agendamento deletado com sucesso"
            }
        }catch(err){
            return{
            error:"ocorreu um erro ao deletar o agendamento"
        }
        }
}