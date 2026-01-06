"use server"
import prisma from "@/lib/prisma";
import {z} from "zod";
import { revalidatePath } from "next/cache";
const formSchema = z.object({
    reminderId: z.string(/*{errorMap: () => ({message: "ID do lembrete é obrigatório"})}*/).min(1, "ID do lembrete é obrigatório"),
});
type FormSchema = z.infer<typeof formSchema>;
export async function deleteReminder(formData: FormSchema) {
    const schema = formSchema.safeParse(formData);
    if (!schema.success) {
        return{
            error: schema.error.issues[0].message
        }
    }
    try {
        await prisma.reminder.delete({
            where: {
                id: schema.data.reminderId
            }});
            revalidatePath('/dashboard');
            return{ 
            success: "Lembrete deletado com sucesso"
            }
    } 
    catch (error) {
        return{
            error: "nao foi possivel deletar o lembrete"
        }
    }
}