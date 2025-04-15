import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Timeblock } from "@/types/types"
import { Button } from "../ui/button"
import TimeblockForm from "./timeblock-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTimeblock, updateTimeblock } from "./api"

interface props {
    timeblock: Timeblock
    containers: React.RefObject<(HTMLDivElement | null)[]>
    index: number
}

export default function CalendarBlock({ timeblock, containers, index }: props) {

    // Calculates top,left,height and width of calendar block to translate it into right posiion on screen
    // TODO: Change number of characters displayed for name based on width
    // TODO: Change size of name text based on height
    let [position, setPosition] = useState({ transform: "translate(0px, 0px)", height: "0px", width: "0px" });

    const startHours = timeblock.startTime.getHours();
    const startMinutes = timeblock.startTime.getMinutes()

    const endHours = timeblock.endTime.getHours()
    const endMinutes = timeblock.endTime.getMinutes();

    const hourDiff = endHours - startHours
    const minuteDiff = endMinutes - startMinutes

    useEffect(() => {
        const container = containers.current[index]

        if (!container) return;

        let heightPerHour = container.offsetHeight / 24

        let top = container.offsetTop + (heightPerHour * startHours) + (startMinutes * (heightPerHour / 60))
        let left = container.offsetLeft

        let height = (hourDiff * heightPerHour) + (minuteDiff * (heightPerHour / 60))
        let width = container.offsetWidth

        setPosition({ transform: `translate(${left}px, ${top}px)`, height: `${height}px`, width: `${width}px` })
    }, [containers, index])
    
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
                <div className="z-10 absolute bg-blue-300 top-0 left-0" style={position}>
                    <h1 className="text-left p-2 text-xl">{timeblock.name}</h1>
                </div>
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