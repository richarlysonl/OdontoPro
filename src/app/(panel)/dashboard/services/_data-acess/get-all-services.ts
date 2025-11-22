"use server"

import prisma from "@/lib/prisma"

export async function getAllServices(userId: string) {
    if (!userId) {
        return {
            error:("usuario não encontrado")
        }
    }

    try {
        const services = await prisma.service.findMany({
            where:{
                userId: userId,
                status: true
                }
            }
        )
        return {
            data: services
        }

    } catch (error) {
        return {
            error:("erro ao buscar serviços")
        }
    }
}