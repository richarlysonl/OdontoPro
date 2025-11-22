"use client"
import { DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { UseDialogServiceForm } from "./dialog-service-form";
import {
    Form,
    FormField, 
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export function DialogService() {

    const form = UseDialogServiceForm();

    return (
        <>
            <DialogHeader>
                <DialogTitle>Adicionar Serviço</DialogTitle>
                <DialogDescription>
                    adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="space-y-2">
                    <div className="flex flex-col">
                        <FormField
                            control={form.control}
                            name="name"
                            render ={ ({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">Nome do Serviço</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do Serviço" {...field}/>
                                    </FormControl>
                                    <FormMessage/>

                                </FormItem>
                            )}
                            />

                            <FormField
                            control={form.control}
                            name="price"
                            render ={ ({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">valor do Serviço</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex: 120,00" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                    
                                </FormItem>
                            )}
                            />
                    </div>
                    <div>
                        <p className="font-semibold">tempo de duração de serviço</p>
                        <div className="grid grid-cols-2 gap-3">
                            <FormField
                            control={form.control}
                            name="hours"
                            render ={ ({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">horas</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                        placeholder="ex: 1" 
                                        min={0}
                                        type="number"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                    
                                </FormItem>
                            )}
                            />
                           <FormField
                            control={form.control}
                            name="minutes"
                            render ={ ({field}) => (
                                <FormItem className="my-2">
                                    <FormLabel className="font-semibold">minutos</FormLabel>
                                    <FormControl>
                                        <Input {...field}
                                        placeholder="ex: 1" 
                                        min={0}
                                        type="number"
                                        />
                                    </FormControl>
                                    <FormMessage/>      
                                </FormItem>
                            )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full font-semibold mt-4">
                        Adicionar Serviço
                        </Button>
                </form>
            </Form>
        </>
    )
}