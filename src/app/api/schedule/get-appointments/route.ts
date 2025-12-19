// backend site.com/api/schedule/get-appointments
import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get('userId');
    const dateParm = searchParams.get('date'); // expected format: 'YYYY-MM-DD'
    if (!userId || userId == "null" || !dateParm || dateParm == "null") {
        return NextResponse.json({
            error: "nenhum agendamento encontrado"
        }, { 
            status: 400 
        }
    )
    }
    try {
        //converter data em um objeto date
        const [year, month, day] = dateParm.split('-').map(Number);
        const startDate = new Date(year, month - 1, day, 0, 0, 0);
        const endtDate = new Date(year, month - 1, day, 23, 59, 59, 999);
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) {
            return NextResponse.json({
                error: "usuário não encontrado"
            }, {                
                status: 400
            });
        }
        const appointments = await prisma.apointment.findMany({
        where: {
            userId: userId,
            date: {
                gte: startDate,
                lte: endtDate
            }
        },
        include: {
            service: true
        }
        });
        
        const blockedSlots = new Set<string>();

        for (const apt of appointments) {
            //ex: apt.time = "14:00", apt.service.duration = 60 (1h)
            const requiredSlots = Math.ceil(apt.service.duration / 30);
            const startIndex = user.times.indexOf(apt.time); //encontrar o índice do horário do agendamento na lista de horários do usuário
            if (startIndex !== -1) {
                for (let i = 0; i < requiredSlots; i++) {
                    const blockedSlot = user.times[startIndex + i];
                    if (blockedSlot) {
                        blockedSlots.add(blockedSlot);
                    }
                }
            }
        }
        const blockedTimes = Array.from(blockedSlots);
        console.log("Blocked times:", blockedTimes);
        return NextResponse.json(blockedTimes); 
    }
       catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "Erro ao buscar agendamentos"
        }, {
            status: 400
        });
    }
    return NextResponse.json({
        ok: true
    });
}