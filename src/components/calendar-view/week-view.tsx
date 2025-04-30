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

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['timeblocks'],
        queryFn: getTimeblocks,
      })
    

    const day = 3;
    const hour = 12
    const min = 15
    const minDiff = 45
    const endhour = 14
    const hourDiff = endhour - hour

    
    return ( 
        <>
            <div id="weekContainer" className="relative w-full h-full grid grid-cols-[4rem_repeat(7,_1fr)] grid-rows-[4rem_repeat(24,_1fr)] ">

                <div className="">
                </div>

                {daysOfWeek.map((day) => (
                    <div className="flex flex-col justify-center text-center">
                        <h3 className="text-sm">{day}</h3>
                        <h1 className="text-2xl">{getDate()}</h1>
                    </div>
                ))}

                {[...Array(24)].map((_,i) => (
                    <>
                        <div id={"time-"+i} className="">
                            <p className="top text-sm text-center transform -translate-y-1/2">{i+":00"}</p>
                        </div>

                        {daysOfWeek.map((day) => (
                            <div id={day+i} className="border border-neutral-200">
                            </div>
                        ))}
                    </>
                ))}


                {isPending ? <h1>Loading</h1> :
                convertAndFilterTimeblocks(data).map((timeblock) =>
                    <CalendarBlock key={timeblock.id} timeblock={timeblock} />
                )}

            </div>
        </>
    )
}