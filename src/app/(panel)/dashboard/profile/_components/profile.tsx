"use client"
import {useState} from "react"
import { ProfileFormData, useProfileForm } from "./profile_form"
import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormLabel,
    FormField,
    FormDescription,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowRight, Car } from "lucide-react"
import Image from "next/image"
import imgTest from "@/../public/foto1.png"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Prisma } from "@/generated/prisma/client"
import { updateProfile } from "../_actions/update_profile"
import { toast } from 'sonner'
import { formatPhone } from '@/utils/formatPhone'
import { signOut, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
type UserWithSubscriptions = Prisma.UserGetPayload<{
    include: {subscription: true}
}>;
interface profileContentProps {
    user: UserWithSubscriptions;
}
export function ProfileContent({user}:profileContentProps ) {
    const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
    const [dialogIsopen, setDialogIsOpen] = useState(false);
    const{update} = useSession();
    const router = useRouter();
    const form = useProfileForm({
        name: user?.name || null,
        address: user?.address || null,
        phone: user?.phone || null,
        status: user?.status || false,
        timezone: user?.timezone || null,
    })
    function generateTimeSlots(): string[] {
        const hours: string[] = [];
        for (let i = 8; i < 24; i++) {
            for(let j = 0; j < 2; j++) {
            const hour = i.toString().padStart(2, '0')/* 2 digitos no maximo se não for 2 digitoss poe 0*/;
            const min = (j*30).toString().padStart(2, '0');
            hours.push(`${hour}:${min}`);
            }
        }
        return hours;
    }
    const hours = generateTimeSlots();
    function touggleHour(hour: string) {
        setSelectedHours((prev) => prev.includes(hour) ? prev.filter(h => h !== hour) : [...prev, hour].sort())
    }

    const timeZones = Intl.supportedValuesOf('timeZone').filter((zone) => 
    zone.startsWith("America/Sao_Paulo") || 
    zone.startsWith("America/Fortaleza") || 
    zone.startsWith("America/Recife") ||
    zone.startsWith("America/Cuiaba") ||
    zone.startsWith("America/Bahia")
    );
    async function onSubmit(values: ProfileFormData){
        const response = await updateProfile({
            name: values.name,
            address: values.address,
            phone: values.phone,
            status: values.status === "active" ? true : false,
            timezone: values.timezone,
            times: selectedHours || [], 
        })
        if(response.error){
            toast.error(response.error, {closeButton: true})
            return;
        }
        //exibe a mensagem de sucesso
        toast.success(response.data)
    }
    async function handleLogout{
        await signOut();
        await update();
        router.replace("/");
    }
    return (
        <div className="mx-auto">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="flex flex-col gap-6">
                        <CardHeader>
                            <CardTitle>Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center items-center">
                                <div className="relative h-40 w-40 rounded-full overflow-hidden">
                                    <Image
                                        src={user.image ? user.image : imgTest}
                                        alt="Foto de perfil"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">Nome completo</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="digite o Nome da clinica" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">endereço</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="digite o endereço da clinica" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold">telefone</FormLabel>
                                            <FormControl>
                                                <Input 
                                                {...field} 
                                                placeholder="(64) 99999-9999)" 
                                                onChange={(e) => {
                                                    const formattedValue = formatPhone(e.target.value);
                                                    field.onChange(formattedValue);
                                                }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">status da clinica</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value ? "active" : "inactive"}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione o status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="active">Ativo (clinica aberta)</SelectItem>
                                                            <SelectItem value="inactive">Inativo (clinica fechada)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-semibold">Fuso horário da clinica</Label>
                                    <Dialog open={dialogIsopen} onOpenChange={setDialogIsOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant='outline' className="w-full justify-between">clique aqui para selecionar horarios
                                                <span><ArrowRight className="w-5 h-5"/></span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="font-semibold">horarios da clinica</DialogTitle>
                                                <DialogDescription>
                                                    selecione os horarios de funcionamento da clinica
                                                </DialogDescription>
                                            </DialogHeader>
                                            <section className="py-4">
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    clique nos horarios a baixo para marcar ou desmarcar
                                                </p>
                                                <div className="grid grid-cols-5 gap-2 ">
                                                    {hours.map((hour) => (
                                                        <Button
                                                            key={hour}
                                                            variant="outline" 
                                                            className={cn('h-10', selectedHours.includes(hour) && 'border-2 border-emerald-500 text-primary'
                                                            )}
                                                            onClick={() => touggleHour(hour)}
                                                            >
                                                                {hour}
                                                            
                                                        </Button>
                                                    ))}
                                                </div>
                                            </section>
                                            <Button className="w-full mt-4" onClick={() => setDialogIsOpen(false)}>fechar</Button>
                                        </DialogContent>
                                    </Dialog>

                                </div>
                            
                            <FormField
                                        control={form.control}
                                        name="timezone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="font-semibold">selecione o seu fuso horario
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione o fuso-horario" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {timeZones.map((zone) => (
                                                                <SelectItem key={zone} value={zone}>
                                                                    {zone}
                                                                </SelectItem>)
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" 
                                    className="w-full mt-4 bg-emerald-500 hover:bg-emerald-500">salvar alterações</Button>
                                </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
            <section>
                <Button 
                variant="destructive" 
                className="w-full mt-4 bg-red-500 hover:bg-red-600"
                onClick={handleLogout}
                >
                    Sair da conta
                </Button>
            </section>
        </div>
    )
}