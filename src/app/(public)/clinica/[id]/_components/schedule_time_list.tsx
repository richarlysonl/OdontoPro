"use client"

import { Button } from "@/components/ui/button";
import { timeSlot } from "./schedule_content";
import { cn } from "@/lib/utils";
import { isToday, isSlotInThePast, isSlotSequenceAvailable } from "./schedule_utils";
interface ScheduleTimeListProps {
    selectedDate: Date;
    selectedTime: string;
    requiredSlots: number;
    blockedTimes: string[];
    availableTimesSlots: timeSlot[];
    clinicTimes: string[];
    onSelectTime: (time: string) => void;
}

export function ScheduleTimeList({selectedDate,
    selectedTime,
    requiredSlots,
    blockedTimes,
    availableTimesSlots,
    clinicTimes,
    onSelectTime
    }: ScheduleTimeListProps) {
        const dateIsToday = isToday(selectedDate);
    return (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
            {availableTimesSlots.map((slot) => {
                const sequenceAvailable = isSlotSequenceAvailable(
                    slot.time,
                    requiredSlots,
                    clinicTimes,
                    blockedTimes
                )
                const isPast = dateIsToday && isSlotInThePast(slot.time);
                const slotEnable = slot.available && sequenceAvailable && !isPast;
                
                return (
                    <Button
                    onClick={() => slotEnable && onSelectTime(slot.time)}
                    type="button"
                    variant="outline"
                    key={slot.time}
                    className={cn("h-10 select-none",
                        selectedTime === slot.time && "border-2 border-emerald-500 text-primary",
                        !slotEnable && "opacity-50 cursor-not-allowed"
                )}
                    disabled={!slotEnable}
                    >
                    {slot.time}
                    </Button>
                )
            })}
        </div>
    )
}