import { getStartOfWeek } from "@/lib/utils"
import CalendarBlock from "../timeblocks/calendar-timeblock"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTimeblocks } from "../timeblocks/api"

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

    /*
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['timeblocks'],
        queryFn: getTimeblocks,
      })
        */

    
    return ( 
        <>
            <div id="weekContainer" className="w-full h-full grid grid-cols-7 grid-rows-[20fr_repeat(288,_1fr)]">

                {daysOfWeek.map((day, i) => (
                        <div className={`col-start-${1 + i}} col-span-1 row-start-1 row-span-1 flex flex-col justify-center w-full h-full text-center border`}>
                            <h1>{day}</h1>
                            <h2>{getDate()}</h2>
                        </div>

                ))}

                {[...Array(24)].map((_,i) => (
                    <div className={`col-start-1 col-span-7 row-start-${2 + i*12} row-span-12 w-full h-full border-b`}>
                    </div>
                ))}



            {/*
                {daysOfWeek.map((day,index) => {
                    return (
                        <div key={day} className={`border text-center row-start-1 row-end-2 col-start-${index+2} col-end-${index+3}`}>
                            <h1>{day}</h1>
                            <h2>{getDate()}</h2>
                        </div>
                    )
                })}
                <div className="h-max row-start-1 row-end-1 col-start-1 col-end-2 text-center">
                    Times
                </div>
                */}

            </div>

            {/*
            {isPending ? <h1>Loading</h1> :
                convertAndFilterTimeblocks(data).map((timeblock) =>
                    <CalendarBlock key={timeblock.id} timeblock={timeblock} containers={containers} index={calculateIndex(timeblock.startTime)} />
                )} */}
        </>
    )
}