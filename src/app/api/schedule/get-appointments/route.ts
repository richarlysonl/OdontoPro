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

        console.log("startDate:", startDate);
        console.log("endtDate:", endtDate);
        return NextResponse.json({
            ok: true
        });
    }   catch (err) {
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