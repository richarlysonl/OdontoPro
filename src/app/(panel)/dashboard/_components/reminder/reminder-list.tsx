"use client"
import { Reminder } from "@prisma/client";
interface ReminderListProps{
    reminder: Reminder[]
}

export function ReminderList({reminder}: ReminderListProps) 
{
    console.log(reminder); 
    return (
    <div>
        Reminder Content Component
    </div>
    );
}