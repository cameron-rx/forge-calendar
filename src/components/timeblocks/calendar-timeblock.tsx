import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Timeblock } from "@/types/types"
import { Button } from "../ui/button"
import TimeblockForm from "./timeblock-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTimeblock } from "./api"

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
        if (containers.current[index] != null) {
            let heightPerHour = containers.current[index].offsetHeight / 24

            let top = containers.current[index].offsetTop + (heightPerHour * startHours) + (startMinutes * (heightPerHour / 60))
            let left = containers.current[index].offsetLeft

            let height = (hourDiff * heightPerHour) + (minuteDiff * (heightPerHour / 60))
            let width = containers.current[index].offsetWidth

            setPosition({ transform: `translate(${left}px, ${top}px)`, height: `${height}px`, width: `${width}px` })
        }
    }, [containers.current[index]])
    
    // Create query for updating timeblock from edit form values
    const [editMode, setEditMode] = useState(false)
    const queryClient = useQueryClient();
    const mutation = useMutation({
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

    const formDefaults = {
        name: timeblock.name,
        location: timeblock.location,
        startHour: timeblock.startTime.getHours(),
        startMinute: timeblock.startTime.getMinutes(),
        endHour: timeblock.endTime.getHours(),
        endMinute: timeblock.endTime.getMinutes(),
        date: new Date(timeblock.startTime.getFullYear(),timeblock.startTime.getMonth(),timeblock.startTime.getDate())
    }

    return (
        <Dialog onOpenChange={() => setEditMode(false)}>
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
                            mutation.mutate(t)
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
                    </>
                }
            </DialogContent>
        </Dialog>
    )
}