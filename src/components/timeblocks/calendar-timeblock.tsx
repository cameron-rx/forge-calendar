import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Timeblock } from "@/types/types"
import { Button } from "../ui/button"
import TimeblockForm from "./timeblock-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTimeblock, updateTimeblock } from "./api"

interface props {
    timeblock: Timeblock
}

export default function CalendarBlock({ timeblock}: props) {
    // Calculates abs position, width and height for element
    let hour = timeblock.startTime.getHours()
    let day = timeblock.startTime.getDay()
    let min = timeblock.startTime.getMinutes()
    let hourDiff = timeblock.endTime.getHours() - timeblock.startTime.getHours() 
    let minDiff = timeblock.endTime.getMinutes() - timeblock.startTime.getMinutes();

    let position = {
        width: `calc((100% - 4rem) / 7)`,
        height: `calc((((100% - 4rem) / 24) * ${hourDiff}) + (((100% - 4rem) / 1440) * ${minDiff}))`,
        top: `calc((((100% - 4rem) / 24) * ${hour}) + (((100% - 4rem) / 1440) * ${min}) + 4rem)`,
        left: `calc((((100% - 4rem) / 7) * ${day}) + 4rem)`

    }

    const renderBlock = () => {
        const startTimeString = timeblock.startTime.toLocaleTimeString("en-US", {hour: "2-digit", hour12: false, minute: "2-digit"})
        const endTimeString = timeblock.endTime.toLocaleTimeString("en-US", {hour: "2-digit", hour12: false, minute: "2-digit"})

        return (
            <div className="z-50 absolute text-white bg-orange-300 rounded-xl shadow-neutral-600 pl-5 pt-2 shadow-md" style={position}>
                <h1 className="text-sm text-shadow-neutral-600 text-shadow-xs font-bold">{timeblock.name}</h1>
                <h1 className="text-sm  text-shadow-neutral-600 text-shadow-xs font-bold">{`${startTimeString} - ${endTimeString} `}</h1>
            </div>
        )
    }

    // Create query for updating timeblock from edit form values
    const [editMode, setEditMode] = useState(false)
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: (t: Timeblock) => {
            return updateTimeblock(t)
        },
        onSuccess: (data) => {
            console.log("Updated timeblock")
            console.log(data)
            queryClient.invalidateQueries({ queryKey: ["timeblocks"] })
            setEditMode(false)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (t: Timeblock) => {
            console.log("Starting delete mutation")
            return deleteTimeblock(t)
        },
        onSuccess: (data) => {
            console.log("Deleted timeblock")
            queryClient.invalidateQueries({ queryKey: ["timeblocks"], refetchType: "all" })
            console.log(data)
        }
    })

    const formDefaults = {
        name: timeblock.name,
        location: timeblock.location,
        startHour: timeblock.startTime.getHours(),
        startMinute: timeblock.startTime.getMinutes(),
        endHour: timeblock.endTime.getHours(),
        endMinute: timeblock.endTime.getMinutes(),
        date: new Date(timeblock.startTime.getFullYear(),timeblock.startTime.getMonth(),timeblock.startTime.getDate())
    }

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={() => {
            setOpen(!open)
            setEditMode(false)
        }}>
            <DialogTrigger asChild>
                {renderBlock()}
            </DialogTrigger>
            <DialogContent>
                {editMode ?
                    <>
                        <DialogHeader>
                            <DialogTitle>Edit Timeblock</DialogTitle>
                        </DialogHeader>
                        <TimeblockForm defaults={formDefaults} onSubmitFn={(t: Timeblock) => {
                            t.id = timeblock.id
                            updateMutation.mutate(t)
                        }
                        } />
                    </>
                    :
                    <>
                        <DialogHeader>
                            <DialogTitle>{timeblock.name}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>{timeblock.location}</DialogDescription>
                        <DialogDescription>{timeblock.startTime.toLocaleString("en-us",{hour: "2-digit", minute: "2-digit", hour12: false})} - {timeblock.endTime.toLocaleString("en-us",{hour: "2-digit", minute: "2-digit", hour12: false})}
                        </DialogDescription>
                        <DialogDescription>{timeblock.startTime.toLocaleDateString()}</DialogDescription>
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                        <Button onClick={() => {
                            deleteMutation.mutate(timeblock)
                            setOpen(false)
                        }}>
                            Delete
                        </Button>
                    </>
                }
            </DialogContent>
        </Dialog>
    )
}