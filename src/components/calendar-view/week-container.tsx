import { getStartOfWeek } from "@/lib/utils"
import DayContainer from "./day-container"
import DayHeader from "./day-header"
import CalendarBlock from "./calendar-block"
import { useRef } from "react"

type Timeblock = {
    id: number
    name: string
    location: string
    startTime: Date
    endTime: Date
}

export default function WeekContainer() {
    const containers = useRef<(HTMLDivElement | null)[]>([]);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // Create array for dates of week and pass to day container the given date
    let weekStart = getStartOfWeek()
    let dayHeaderDate = new Date(weekStart)
    let weekStartUTC = Date.UTC(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
    let weekEndUTC = weekStartUTC + (1000 * 60 * 60 * 24 * 7)

    function getDate() {
        const returnDate = dayHeaderDate.getDate()
        dayHeaderDate.setDate(dayHeaderDate.getDate() + 1)
        return returnDate;
    } 

    function calculateIndex(blockDate:Date) {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = weekStartUTC
        const utc2 = Date.UTC(blockDate.getFullYear(), blockDate.getMonth(), blockDate.getDate());
        const index = Math.floor((utc2 - utc1) / _MS_PER_DAY);
        return index 

    }

    const timeblocks: Timeblock[] = [
        {id: 1,name: "Help Sam",location: "IC",startTime:  new Date(2025,2,23,15),endTime: new Date(2025,2,23,18)},
        {id: 2,name: "Swim",location: "Pond's Forge",startTime:  new Date(2025,2,26,10),endTime: new Date(2025,2,26,14)},
        {id: 3,name: "Test 1",location: "Pond's Forge",startTime:  new Date(2025,2,29,6),endTime: new Date(2025,2,29,10)}
    ]

    const thisWeekBlocks = timeblocks.filter((t) => {
        const utcDate = Date.UTC(t.startTime.getFullYear(), t.startTime.getMonth(), t.startTime.getDate())
        return utcDate >= weekStartUTC && utcDate < weekEndUTC
    })
    

    return ( 
        <>
            {daysOfWeek.map((day, i) =>
                <div key={day} className="w-full">
                    <DayHeader day={day} date={getDate()} />
                    <div ref={(el) => { containers.current[i] = el }} id={"day-container-"+ i} className="relative border h-19/20  border-gray-50 border-solid">
                        <DayContainer/>
                    </div>
                </div>
            )}
            {thisWeekBlocks.map((timeblock, i) => 
                <CalendarBlock key={timeblock.id} name={timeblock.name} startTime={timeblock.startTime} endTime={timeblock.endTime} containers={containers} index={calculateIndex(timeblock.startTime)} />
            )}
        </>
    )
}