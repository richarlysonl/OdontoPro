import { getReminders } from "../_data-acess/get_reminders";

export async function Reminders({userId}: {userId:string}) {
    const reminders = await getReminders({userId: userId});
    return(
        <div>Reminders Component</div>
    );
}