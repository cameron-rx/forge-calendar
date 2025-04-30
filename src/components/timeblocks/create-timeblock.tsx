import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import TimeblockForm from "./timeblock-form"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Timeblock } from "@/types/types";
import { createTimeblock } from "./api";
import { Button } from "../ui/button";

export default function CreateTimeblockButton() {
    const [active, setActive] = useState(false)

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (t: Timeblock) => {
            return createTimeblock(t)
        },
        onSuccess: () => {
            console.log("Timeblock added")
            queryClient.invalidateQueries({ queryKey: ["timeblocks"] })
            setActive(false)
        }
    })

    const formDefaults = {
        name: "",
        location: "",
        startHour: 0,
        startMinute: 0,
        endHour: 0,
        endMinute: 0,
        date: new Date(Date.now())
    }

    return (
        <Dialog open={active} onOpenChange={setActive}>
            <DialogTrigger>
                <Button className="bg-orange-500 hover:bg-amber-600 w-9/10">
                    Create
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Timeblock</DialogTitle>
                </DialogHeader>
                <TimeblockForm defaults={formDefaults} onSubmitFn={(t: Timeblock) => mutation.mutate(t)}/>
            </DialogContent>
    </Dialog>
    )
}