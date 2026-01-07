'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Reminder } from "@prisma/client";
import { Plus, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteReminder } from "../../_actions/delete-reminders";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DialogContent,
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
    } from "@/components/ui/dialog";
import { ReminderContent } from "./reminder-content";

interface ReminderListProps{
    reminder: Reminder[]
}

export function ReminderList({reminder}: ReminderListProps) 
{
    const router =  useRouter();
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    async function handleDeleteReminder(id: string) {
        const response = await deleteReminder({reminderId: id});
        if(response.error){
            toast.error(response.error);
            return;
        }
        toast.success(response.success);
        router.refresh();
    }
    return (
    <div>
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold">Lembretes</CardTitle>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

                <DialogTrigger asChild>
                    <Button variant="ghost" className="rounded-full p-2">
                        <Plus className="w-5 h-5"/>
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Lembrete</DialogTitle>
                    <DialogDescription>
                        criar novo lembrete
                    </DialogDescription>
                </DialogHeader>
                <ReminderContent
                    closeDialog={() => setIsDialogOpen(false)}
                />
                </DialogContent>

                </Dialog>
                </CardHeader>
                <Button variant="ghost" className="w-full justify-start rounded-none border-t">
                </Button>
                <CardContent>
                    {reminder.length === 0 && (
                        <p className="text-sm text-gray-500">Nenhum lembrete encontrado.</p>
                    )}
                    <ScrollArea 
                    className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
                    {reminder.map((Item) => (
                        <article 
                        key={Item.id}
                        className="flex flex-wrap flex-row items-center justify-between py-2 px-2 bg-yellow-200 mb-2 rounded-md">
                            <p className="text-sm lg:text-base">{Item.description}</p>
                            <Button
                            className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-2"
                            size="sm"
                            onClick={() => {handleDeleteReminder(Item.id)}}>
                                <Trash className="w-4 h-4 text-white"/>
                            </Button>
                        </article>
                    ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
    );
}