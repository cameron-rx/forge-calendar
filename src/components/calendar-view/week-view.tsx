import { getStartOfWeek } from "@/lib/utils"
import DayContainer from "./day-container"
import DayHeader from "./day-header"
import CalendarBlock from "./calendar-block"
import { useRef } from "react"
import TimelineLabels from "./timeline-labels"
import { useQuery } from "@tanstack/react-query"
import { getTimeblocks } from "./api"

type Timeblock = {
    id: number
    name: string
    location: string
    startTime: Date
    endTime: Date
}

// TODO: Will have to add offset to utc dates in order to convert them to users local time for filtering and displaying
export default function WeekView() {
    const containers = useRef<(HTMLDivElement | null)[]>([]);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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

    function convertAndFilterTimeblocks(data:any) {
        const timeblocks: Timeblock[] = data.map((t: any) => {
            const block: Timeblock = {
                id: t.id,
                name: t.name,
                location: t.location,
                startTime: new Date(t.startTime),
                endTime: new Date(t.endTime),
            }
            return block
        }).filter((t: Timeblock) => {
            const utcDate = Date.UTC(t.startTime.getFullYear(), t.startTime.getMonth(), t.startTime.getDate())
            return utcDate >= weekStartUTC && utcDate < weekEndUTC
        });

        return timeblocks
    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getTimeblocks,
      })
    
    return ( 
        <>
            <div id="weekContainer" className="w-full h-full flex flex-row justify-evenly">
                <TimelineLabels />
                {daysOfWeek.map((day, i) =>
                    <div key={day} className="w-full">
                        <DayHeader day={day} date={getDate()} />
                        <div ref={(el) => { containers.current[i] = el }} id={"day-container-" + i} className="relative border h-19/20  border-gray-50 border-solid">
                            <DayContainer />
                        </div>
                    </div>
                )}
            </div>
            {isPending ? <h1>Loading</h1> :
                convertAndFilterTimeblocks(data).map((timeblock) =>
                    <CalendarBlock key={timeblock.id} name={timeblock.name} startTime={timeblock.startTime} endTime={timeblock.endTime} containers={containers} index={calculateIndex(timeblock.startTime)} />
                )}
        </>
    )
}