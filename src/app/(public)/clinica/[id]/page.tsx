import { redirect } from "next/navigation";
import { GetInfoSchudule } from "./data_acess/get_info_schudule";
import { ScheduleContent } from "./components/schedule_content";
export default async function SchedulePage({
    params,
}:{
    params: Promise<{ id: string}>
}) {
    const userId = (await params).id;
    const user = await GetInfoSchudule({userId: userId});
    if(!user){
        redirect("/")
    }
    return (
        <ScheduleContent clinic={user}/>
    )
}