"use client"
import { useProfileForm } from "./profile_form"
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

export function ProfileContent() {
    const form = useProfileForm()

    return (
        <div className="mx-auto">
            <Form {...form} >
                <form>
                    <Card className="flex flex-col gap-6">
                        <CardHeader>
                            <CardTitle>Perfil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex justify-center items-center">
                                <div className="relative h-40 w-40 rounded-full overflow-hidden">
                                    <Image
                                        src={imgTest}
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
                                                <Input {...field} placeholder="digite o numero da clinica" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="stats"
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
                                    <Dialog>
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
                                                <p>
                                                    clique nos horarios a baixo para marcar ou desmarcar
                                                </p>
                                                <div>
                                                    
                                                </div>
                                            </section>
                                        </DialogContent>
                                    </Dialog>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>
        </div>
    )
}