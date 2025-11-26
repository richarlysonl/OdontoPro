
/**
 * converte valor monetario de reais(BRL) para centavos
 * @param {string}amont valor monetario a ser convertido
 * @returns {number} valor em centavos
 * @example 
 * ConvertRealToCents("1.200,00") // retorna 120000 cents
 */
export function ConvertRealToCents(amont: string){
    const numericPrice = parseFloat(amont.replace(/\./g, "").replace(",","."));
    const priceCents = Math.round(numericPrice * 100);
    return priceCents;
}
