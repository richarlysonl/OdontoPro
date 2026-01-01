import { getTimesClinic } from "../../_data-acess/get-times"
import { AppointmentsList } from "./appointment-list";
export async function Appointments({userId}:{userId:string}){
    const {times,userId:id} = await getTimesClinic({userId:userId})
    return(
        <div>
            <AppointmentsList times={times}/>
        </div>
    )
}