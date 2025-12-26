import { redirect } from "next/navigation";
import { GetInfoSchudule } from "./_data_acess/get-info-schudule";
import { ScheduleContent } from "./_components/schedule_content";
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