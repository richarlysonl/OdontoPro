import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { useForm } from 'react-hook-form';

const FormSchema = z.object({
    name: z.string().min(1, 'O nome do servico é obrigatório'),
    price: z.string().min(1, 'O preço do serviço é obrigatório'),
    hours: z.string(),
    minutes: z.string(),
    });
    export interface DialogServiceFormProps{
    initialValues?: {
        name: string;
        price: string;
        hours: string;
        minutes: string;
        }
    }
    export type DialogServiceFormData = z.infer<typeof FormSchema>;
    export function UseDialogServiceForm(){
        return useForm<DialogServiceFormData>({
            resolver: zodResolver(FormSchema),
            defaultValues: {
                name: '',
                price: '',
                hours: '',
                minutes: ''
        }
    });
        

    }