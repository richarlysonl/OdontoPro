"use client"
// - valor em centavos = valor em reais * 100
// valor em reais = valor em centavos / 100
import { DialogHeader } from "@/components/ui/dialog";
import { DialogContentProps, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { DialogServiceFormData, UseDialogServiceForm } from "./dialog-service-form";
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
import { ConvertRealToCents } from "@/utils/convertCurrency";
export function DialogService() {

    const form = UseDialogServiceForm();

    async function onSubmit(values: DialogServiceFormData) {
        const priceInCents = ConvertRealToCents(values.price);
        console.log(priceInCents)
    }

    function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");
    if(value){
        value = (parseInt(value,10) / 100).toFixed(2);
        value = value.replace(".", ","); //separando 1234.56 em 1.234,00
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        // encontrar o grupo de 3 digitos que estejam seguidos por outro grupo de 3 digitos. garantindo
        // que os pontos sejam inseridos entre os milhares
        //ex: 1234567 vira 1.234.567,89
    }
    event.target.value = value;
    form.setValue("price", value);
    }
    return (
        <>
            <DialogHeader>
                <DialogTitle>Adicionar Serviço</DialogTitle>
                <DialogDescription>
                    adicione um novo serviço
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="space-y-2"
                onSubmit={form.handleSubmit(onSubmit)}
                >
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
                                        <Input placeholder="ex: 120,00" {...field}
                                        onChange={changeCurrency}
                                        />
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