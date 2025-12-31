const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Prisma conectado com sucesso!');
    
    const users = await prisma.user.findMany();
    console.log('✅ Query funcionou! Usuários:', users.length);
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

test();