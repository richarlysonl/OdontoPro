"use client"
import { useState } from 'react'
import DatePicker, {registerLocale} from 'react-datepicker' 
import { ptBR} from 'date-fns/locale/pt-BR'
import "react-datepicker/dist/react-datepicker.css";
interface dateTimePickerProps{
    minDate?: Date;
    className?: string;
    initialDate?: Date;
    onChange: (date: Date) => void
}
    registerLocale("pt_BR", ptBR);
export function DateTimePicker({className, minDate, initialDate, onChange}: dateTimePickerProps){
    const [startDate, setStartDate] = useState(initialDate || new Date());
    function handleChange(date: Date | null){
        if(date){
            setStartDate(date);
            onChange(date);
        }
    }
    return(
        <DatePicker
        className={className}
        selected={startDate}
        locale="pt-BR"
        minDate={minDate ?? new Date()}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
        />
    )
}