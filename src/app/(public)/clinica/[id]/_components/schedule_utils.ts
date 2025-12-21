/*
*determina se um horario ja passou ou nao
*/
export function isToday(date: Date) {
    const now = new Date();
    return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
    )
}
export function isSlotInThePast(slotTime: string): boolean {
    //slotTime 10:00 => 10 horas e 0 minutos
    const [slotHours, slotMinutes] = slotTime.split(":").map(Number);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    if(slotHours < currentHour)
        return true;
   else if(slotHours === currentHour && slotMinutes <= currentMinute)
    return  true;

    return false
}