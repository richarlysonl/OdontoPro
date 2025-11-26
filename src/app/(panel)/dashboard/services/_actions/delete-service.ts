'use server'
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {z} from 'zod';
import { revalidatePath } from "next/cache";
const formSchema = z.object({
    serviceID: z.string().min(1,"ID do serviço é obrigatório")
});
type FormSchema = z.infer<typeof formSchema>;
export async function deleteService(formData: FormSchema){
    const session = await auth();
        if(!session?.user.id){
            return {
                error:"falha ao deletar servico"
            }
        }
        const schema = formSchema.safeParse(formData);
        if(!schema.success){
            return {
                error: schema.error.issues[0].message
            }
        }
    try{
        await prisma.service.update({
            where:{
                id: formData.serviceID,
                userId: session.user.id
            },
            data:{
                status: false
            }
            
        })
        revalidatePath("/panel/dashboard/services");
        return {
                data:{ 
                    message: "Serviço deletado com sucesso"
                }
            }
}   catch (error) { 
        console.log(error);
        return {
            error: "Erro ao criar novo serviço"
        }
    }
}   

