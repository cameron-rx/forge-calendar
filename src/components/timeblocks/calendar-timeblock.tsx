import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Timeblock } from "@/types/types"
import { Button } from "../ui/button"

interface props {
    timeblock: Timeblock
    containers: React.RefObject<(HTMLDivElement | null)[]>
    index: number
}

export default function CalendarBlock({timeblock, containers, index}:props) {
    let [position, setPosition] = useState({transform: "translate(0px, 0px)", height: "0px", width: "0px"});
    const [editMode, setEditMode] = useState(false)

    const startHours = timeblock.startTime.getHours();
    const startMinutes = timeblock.startTime.getMinutes()

    const endHours = timeblock.endTime.getHours()
    const endMinutes = timeblock.endTime.getMinutes();
    
    const hourDiff = endHours - startHours
    const minuteDiff = endMinutes - startMinutes

    // Calculates top,left,height and width of calendar block to translate it into right posiion on screen
    // TODO: Change number of characters displayed for name based on width
    // TODO: Change size of name text based on height
    useEffect(() => {
        if (containers.current[index] != null) {
            let heightPerHour = containers.current[index].offsetHeight / 24

            let top = containers.current[index].offsetTop + (heightPerHour * startHours) + (startMinutes * (heightPerHour/60))
            let left = containers.current[index].offsetLeft

            let height = (hourDiff * heightPerHour) + (minuteDiff * (heightPerHour/60))
            let width = containers.current[index].offsetWidth

            setPosition({transform: `translate(${left}px, ${top}px)`, height: `${height}px`, width: `${width}px`})
        }
    }, [containers.current[index]])


    return (
        <Dialog onOpenChange={() => setEditMode(false)}>
            <DialogTrigger asChild>
                <div className="z-10 absolute bg-blue-300 top-0 left-0" style={position}>
                    <h1 className="text-left p-2 text-xl">{timeblock.name}</h1>
                </div>
            </DialogTrigger>
            <DialogContent>
                {editMode ? <></> :
                    <>
                        <DialogHeader>
                            <DialogTitle>{timeblock.name}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>{timeblock.location}</DialogDescription>
                        <DialogDescription>{timeblock.startTime.toLocaleString()}</DialogDescription>
                        <DialogDescription>{timeblock.endTime.toLocaleString()}</DialogDescription>
                        <Button onClick={() => setEditMode(true)}>Edit</Button>
                    </>
                 }
            </DialogContent>
        </Dialog>
    )
}