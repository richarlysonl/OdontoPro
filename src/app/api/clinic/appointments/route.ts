import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
/*
    rota para buscar os agedamentos da clinica
    => data
    => userId (NÃO POSSO RECEBER DA ROTA URL req.params)
*/
export const GET = auth(async function GET(request) {
  if (!request.auth) 
    return NextResponse.json({ error: "acesso não autorizado" }, { status: 401 })
    
  const searchParams = request.nextUrl.searchParams
  const dateString = searchParams.get("date") as string;
  const clinicId = request.auth?.user?.id
  if(!clinicId)
    return NextResponse.json({error:"usuario não encontrado"}, {status:400})
  if(!dateString)
    return NextResponse.json({error:"data não informada"}, {status:400})

    try{
        const [year,month,day] = dateString.split("-").map(Number)
        const startDate = new Date(Date.UTC(year, month-1,day,0,0,0,0))
        const endDate = new Date(Date.UTC(year,month -1,day,23,59,59,999))
        const appointments = await prisma.appointment.findMany({
            where:{
            userId:clinicId,
            date:{
                gte: startDate,
                lte: endDate,
            }
            },
            include:{
                service: true
            }
        })
        return NextResponse.json({appointments})
    }catch(err){
        return NextResponse.json({error:"falha ao buscar agendamentos"}, {status:400})
    }
})