export function formatPhone(value: string) {
    // Remove todos os caracteres que não são dígitos
    const cleanedValues = value.replace(/\D/g, '')
    // no maximo 11 caracteres
    if(cleanedValues.length > 11){
        return value.slice(0,15)
    }
    //aplicar a Mascara ou formatação
    const formattedValue = cleanedValues
    .replace(/^(\d{2})(\d)/g, '($1) $2') // (XX)
    .replace(/(\d{4,5})(\d{4})$/,'$1-$2' ) //4 digitos 
    return formattedValue;
}
export function extractPhoneNumber(value: string) {
    const phoneValue = value.replace(/[\(\)\s-]/g, "");
    return phoneValue;
}