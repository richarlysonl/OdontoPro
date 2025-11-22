import { zodResolver } from "@hookform/resolvers/zod";
import { time } from "console";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface USeProfileFormProps {
    name: string | null
    address: string | null
    phone: string | null
    status: boolean
    timezone: string | null;
}

const profileSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    status: z.string(),
    timezone: z.string().min(1, { message: "Fuso horário é obrigatório" }),
})
export type ProfileFormData = z.infer<typeof profileSchema>
export function useProfileForm({name,address,phone,status,timezone}: USeProfileFormProps) {
    return useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: name || "",
            address: address || "",
            phone: phone || "",
            status: status ? "active" : "inactive",
            timezone: timezone || "",
        }   
    })
}