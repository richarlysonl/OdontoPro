'use client'
import { Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel, 
    FormMessage,
} from "@/components/ui/form";
import { ReminderFormData, useReminderForm } from "../reminder-form";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";
export function ReminderContent() {
    const form = useReminderForm();
    async function onSubmit(formData:ReminderFormData) {
        return;
    }
    return (
        <div className="grip gap-4 py-4">
            <Form {...form}>
                <form className="flex flex-col gap-4"
                onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                    control={form.control}
                    name="description"
                    render ={({field}) => (
                        <FormItem>
                            <FormLabel>descreva o lembrete</FormLabel>
                            <FormControl>
                                <Textarea
                                {...field}
                                placeholder="digite o lembrete"
                                className="max-h-52px resize-none"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )} 
                    />
                    <Button type="submit"
                    disabled={!form.watch("description")}
                    >
                        cadastrar lembrete
                    </Button>
                </form>
            </Form>
        </div>
    );
}