import { useEffect, useRef, useState } from "react"

interface props {
    name: string
    startTime: Date
    endTime: Date
    containers: React.RefObject<(HTMLDivElement | null)[]>
    index: number
}

export default function CalendarBlock({name, startTime, endTime, containers, index}:props) {
    let [position, setPosition] = useState({transform: "translate(0px, 0px)", height: "0px", width: "0px"});

    const startHours = startTime.getHours();
    const startMinutes = startTime.getMinutes()

    const endHours = endTime.getHours()
    const endMinutes = endTime.getMinutes();
    
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
        <div className="z-10 absolute bg-blue-300 top-0 left-0" style={position}>
            <h1 className="p-2 text-xl">{name}</h1>
        </div>
    )
}