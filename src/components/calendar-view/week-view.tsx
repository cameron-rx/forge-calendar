import { getEndOfWeek, getStartOfWeek } from "@/lib/utils"
import CalendarBlock from "../timeblocks/calendar-timeblock"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTimeblocks } from "../timeblocks/api"
import Forge from "../forge/forge"
import { TimeblockResponseDTO } from "@/types/types"

type Timeblock = {
    id: number
    name: string
    location: string
    startTime: Date
    endTime: Date
}

// TODO: Will have to add offset to utc dates in order to convert them to users local time for filtering and displaying
export default function WeekView() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let weekStart = getStartOfWeek()
    let weekEnd = getEndOfWeek();
    let dayHeaderDate = new Date(weekStart)
    let weekStartUTC = Date.UTC(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate())
    let weekEndUTC = Date.UTC(weekEnd.getFullYear(), weekEnd.getMonth(), weekEnd.getDate())

    function getDate() {
        const returnDate = new Date(dayHeaderDate)
        dayHeaderDate.setDate(dayHeaderDate.getDate() + 1)
        return returnDate;
    }

    function convertAndFilterTimeblocks(data: any) {
        const timeblocks: Timeblock[] = data.map((t: TimeblockResponseDTO) => {
            const block: Timeblock = {
                id: t.id,
                name: t.name,
                location: t.location,
                startTime: new Date(t.startTime),
                endTime: new Date(t.endTime),
            }
            console.log(`Start ${block.startTime}`)
            console.log(`End ${block.endTime}`)
            return block
        }).filter((t: Timeblock) => {
            const utcDate = Date.UTC(t.startTime.getFullYear(), t.startTime.getMonth(), t.startTime.getDate())
            return utcDate >= weekStartUTC && utcDate <= weekEndUTC
        });

        return timeblocks
    }

    function createDayHeaders(day: Date) {
        let today = new Date(Date.now())

        if (day.getDate() == today.getDate() &&
            day.getMonth() == today.getMonth() &&
            day.getFullYear() == today.getFullYear()) {
            return (
                <div className="flex flex-col justify-center text-center bg-orange-500 text-white">
                    <h3 className="text-sm">{day.toLocaleDateString("en-US", { weekday: "long" })}</h3>
                    <h1 className="text-2xl">{day.getDate()}</h1>
                </div>
            )
        }
        else {
            return (
                <div className="flex flex-col justify-center text-center">
                    <h3 className="text-sm">{day.toLocaleDateString("en-US", { weekday: "long" })}</h3>
                    <h1 className="text-2xl">{day.getDate()}</h1>
                </div>
            )
        }

    }

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['timeblocks'],
        queryFn: getTimeblocks,
    })


    return (
        <>
            <div id="weekContainer" className="relative w-full h-full grid grid-cols-[4rem_repeat(7,_1fr)] grid-rows-[4rem_repeat(24,_1fr)] ">

                <div className="">
                </div>

                {daysOfWeek.map((day) => (
                    createDayHeaders(getDate())
                ))}
                

                {[...Array(24)].map((_, i) => (
                    <>
                        <div id={"time-" + i} className="">
                            <p className="top text-sm text-center transform -translate-y-1/2">{i + ":00"}</p>
                        </div>

                        {daysOfWeek.map((day) => (
                            <div id={day + i} className="border border-neutral-200">
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