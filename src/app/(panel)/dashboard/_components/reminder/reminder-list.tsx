"use client"
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Reminder } from "@prisma/client";
import { Plus, Trash } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
interface ReminderListProps{
    reminder: Reminder[]
}

export function ReminderList({reminder}: ReminderListProps) 
{
    console.log(reminder); 
    return (
    <div>
        <div className="flex flex-col gap-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl md:text-2xl font-bold">Lembretes</CardTitle>
                </CardHeader>
                <Button variant="ghost" className="w-full justify-start rounded-none border-t">
                    <Plus className="w-5 h-5 mr-2"/>
                </Button>
                <CardContent>
                    {reminder.length === 0 && (
                        <p className="text-sm text-gray-500">Nenhum lembrete encontrado.</p>
                    )}
                    {reminder.map((Item) => (
                        <article 
                        key={Item.id}
                        className="flex flex-wrap flex-row items-center justify-between py-2 px-2 bg-yellow-200 mb-2 rounded-md">
                            <p className="text-sm lg:text-base">{Item.description}</p>
                            <Button
                            className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p-2"
                            size="sm">
                                <Trash className="w-4 h-4 text-white"/>
                            </Button>
                        </article>
                    ))}
                </CardContent>
            </Card>
        </div>
    </div>
    );
}