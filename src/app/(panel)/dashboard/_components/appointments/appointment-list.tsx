"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { format } from 'date-fns'
import { features } from "process"
import { Prisma } from "@prisma/client"
interface AppointmentsListProps {
    times: string[]
}
type AppointmentsWithService = Prisma.AppointmentGetPayload<{
    include: {
        service: true
    }
}>
export function AppointmentsList({ times }: AppointmentsListProps) {
    const searchParams = useSearchParams();
    const date = searchParams.get("date");
    const { data = [], isLoading } = useQuery<AppointmentsWithService[]>({
        queryKey: ["get-appointments", date],
        queryFn: async () => {
            let activeDate = date;
            if (!activeDate) {
                activeDate = format(new Date(), "yyyy-MM-dd");
            }

            const url = `${process.env.NEXT_PUBLIC_URL}/api/clinic/appointments?date=${activeDate}`;
            const response = await fetch(url);
            const json = await response.json();

            if (!response.ok) return [];

            return json.appointments as AppointmentsWithService[];
        },
        staleTime: 20000, //20 segundos
        refetchInterval: 60000 //60 segundos
    })

    //montar occupantMap slot > appointment
    //se o appointment comeca [13:00] e tem 2 requiredSlot 2
    //occupantMap ["13:00",appointment] ["13:30",appointment]
    const occupantMap: Record<string, AppointmentsWithService> = {}
    if (data && data.length > 0) {
        for (const appointment of data) {
            const requiredSlot = Math.ceil(appointment.service.duration / 30);
            //descobrir o index do array de horarios
            const startIndex = times.indexOf(appointment.time)
            //se encontrou o index
            if (startIndex !== -1) {
                console.log("hy")
                for (let i = 0; i < requiredSlot; i++) {
                    const slotIndex = startIndex + i;
                    if (slotIndex < times.length) {
                        //ocupantMap recebe o index
                        occupantMap[times[slotIndex]] = appointment;
                    }
                }
            }
        }
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold">Agendamentos</CardTitle>
                <button>selecionar data</button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)] lg:h-[calc(100vh-15rem)] pr-4">
                    {isLoading ? (
                        <p>carregando agenda</p>
                    ) : (
                        times.map((slot) => {
                            //occpupantMap
                            const occupant = occupantMap[slot];
                            if (occupant) {
                                console.log("hy mister");
                                return (
                                    <div
                                        key={slot}
                                        className="flex py-2 items-center border-t last:border-b"
                                    >
                                        <div className="w-16 text-sm font-semibold px-5">
                                            {slot}
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <div className="flex">
                                                <div className="font-semibold">{occupant.name}</div>
                                                <div className="text-sm text-gray-500">{occupant.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            return (
                                <div
                                    key={slot}
                                    className="flex py-2 items-center border-t last:border-b"
                                >
                                    <div className="w-16 text-sm font-semibold px-5">
                                        {slot}
                                    </div>
                                    <div className="text-gray-500 flex-1 text-sm">
                                        disponivel
                                    </div>
                                </div>
                            )
                        })
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}