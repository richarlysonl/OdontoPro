import { 
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,   
    } from "@/components/ui/dialog";
import { AppointmentsWithService } from "./appointment-list";
import { format } from "date-fns";
import {formatCurrency} from "@/utils/formatCurrency"
interface DialogAppointmentProps{
    appointment: AppointmentsWithService | null;
}
export function DialogAppointment({ appointment }:DialogAppointmentProps){
    return(
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Detalhes do agendamento
            </DialogTitle>
            <DialogDescription>
                veja todos os detalhes do agendamento
            </DialogDescription>
        </DialogHeader>
        <div>
            {appointment &&(
                <article>
                    <p><span className="font-semibold">horario agendado:</span>{appointment.time}</p>
                    <p className="mb-2"><span className="font-semibold">data do agendamento:</span>{new Intl.DateTimeFormat('pt-BR',{
                        timeZone: "UTC",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                    }).format(new Date(appointment.date))}</p>
                    <p><span className="font-semibold">nome:</span>{appointment.name}</p>
                    <p><span className="font-semibold">telefone:</span>{appointment.phone}</p>
                    <p><span className="font-semibold">email:</span>{appointment.email}</p>
                        <section className="bg-gray-100 mt-4 p-2 rounded-md">
                            <p><span className="font-semibold">servico:</span>{appointment.service.name}</p>
                            <p><span className="font-semibold">preco:</span>{formatCurrency((appointment.service.price/100))}</p>
                        </section>
                </article>
            )}
        </div>
    </DialogContent>
    )
}