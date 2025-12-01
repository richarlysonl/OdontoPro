'use server'
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import {z} from 'zod';
import { revalidatePath } from "next/cache";
const formSchema = z.object({
    serviceId: z.string().min(1,"ID do serviço é obrigatório"),
    name: z.string().min(1,"Nome do serviço é obrigatório"),
    price: z.number().min(1,"Preço do serviço é obrigatório"),
    duration: z.number().min(1,"Duração do serviço é obrigatória"),
});
type FormSchema = z.infer<typeof formSchema>;
export async function updateService(serviceId: string, formData: FormSchema){
    const session = await auth();
        if(!session?.user.id){
            return {
                error:"Usuário não autenticado"
            }
        }   
        const schema = formSchema.safeParse(formData);
        if(!schema.success){
        return {
            error: schema.error.issues[0].message
        }
    }
    try{
        const service = await prisma.service.update({
            where:{
                id: formData.serviceId,
                userId: session.user.id
        },
        data:{
            name: formData.name,
            price: formData.price,
            duration: formData.duration < 30 ? 30 : formData.duration  
        }
    })
    revalidatePath("/panel/dashboard/services");
    return {
            data:"Setvico atualizado com sucesso"
        } 
    }catch (error) {
        console.log(error);
        return {
            error: "Erro ao atualizar serviço"
        }
    }
}