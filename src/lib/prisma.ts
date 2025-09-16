import { prismaClient } from '@prisma/client';
    let prisma: prismaClient;
if(process.env.NODE_ENV === 'production'){
    prisma = new prismaClient();
}else{
    let globalWithPrisma = global as typeof globalThis & {
        prisma: prismaClient
    }
    if(!globalWithPrisma.prisma){
        globalWithPrisma.prisma = new prismaClient();
    }
    prisma = globalWithPrisma.prisma;
}
export default prisma;