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
/** 
 * verificar se a partir de um slot inicial existe uma sequencia de "requiredSlots" disponiveis
 * explo: se um servico tem duracao de 2 slots, verificar se os proximos 2 horarios estao disponiveis
 * @param startSlot 
 * @param requiredSlots 
 * @param allSlots 
 * @param blockedSlots 
 * @returns 
 */
export function isSlotSequenceAvailable(
    startSlot: string, //primeiro slot disponivel  
    requiredSlots: number, //quantidade de slots necessarios
    allSlots: string[], //todos os horarios da clinica
    blockedSlots: string[]){ //slots bloqueados
        const startIndex = allSlots.indexOf(startSlot); 
        if(startIndex === -1 || startIndex + requiredSlots > allSlots.length)
            return false;
        for(let i = startIndex; i < startIndex + requiredSlots; i++){
            const slotTime = allSlots[i];
            //se o horario estiver bloqueado
            if(blockedSlots.includes(slotTime)){
                return false;
            }
        }
        return true;
    }