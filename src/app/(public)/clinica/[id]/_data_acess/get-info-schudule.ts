"use server";

import prisma from "@/lib/prisma";

export async function GetInfoSchudule({userId}: {userId: string}) {
    try{
        if(!userId)
        return null;
    const user = await prisma.user.findFirst({
        where: {id: userId},
        include: {
            subscription: true,
            services: {
                where: {
                    status: true,
                },
            },
        }
    });
    if(!user)
        return null;
    return user;
    } catch(e){
        console.log(e);
        return null;
    }
}