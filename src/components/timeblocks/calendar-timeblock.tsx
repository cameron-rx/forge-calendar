import { useEffect, useRef, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Timeblock } from "@/types/types"

interface props {
    timeblock: Timeblock
    containers: React.RefObject<(HTMLDivElement | null)[]>
    index: number
}

export default function CalendarBlock({timeblock, containers, index}:props) {
    let [position, setPosition] = useState({transform: "translate(0px, 0px)", height: "0px", width: "0px"});

    const startHours = timeblock.startTime.getHours();
    const startMinutes = timeblock.startTime.getMinutes()

    const endHours = timeblock.endTime.getHours()
    const endMinutes = timeblock.endTime.getMinutes();
    
    const hourDiff = endHours - startHours
    const minuteDiff = endMinutes - startMinutes

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
        <Dialog>
            <DialogTrigger>
                <div className="z-10 absolute bg-blue-300 top-0 left-0" style={position}>
                    <h1 className="text-left p-2 text-xl">{timeblock.name}</h1>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{timeblock.name}</DialogTitle>
                </DialogHeader>
                <DialogDescription>{timeblock.location}</DialogDescription>
                <DialogDescription>{timeblock.startTime.toLocaleString()}</DialogDescription>
                <DialogDescription>{timeblock.endTime.toLocaleString()}</DialogDescription>
            </DialogContent>
        </Dialog>
    )
}