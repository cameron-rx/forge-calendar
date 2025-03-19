import { getStartOfWeek } from "@/lib/utils"
import DayContainer from "./day-container"
import DayHeader from "./day-header"
import CalendarBlock from "./calendar-block"

export default function WeekContainer() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // Create array for dates of week and pass to day container the given date
    let weekStart = getStartOfWeek()
    let startTime = new Date(Date.now())
    let endTime = new Date(startTime)
    endTime.setHours(endTime.getHours() + 5)
    endTime.setMinutes(endTime.getMinutes() + - 15)

    function getDate() {
        const returnDate = weekStart.getDate()
        weekStart.setDate(weekStart.getDate() + 1)

        return returnDate;
    } 

    return ( 
        <>
            {daysOfWeek.map((day, i) =>
                <div className="w-full">
                    <DayHeader day={day} date={getDate()} />
                    <div id={"day-container-"+ i} className="relative border h-19/20  border-gray-50 border-solid">
                        {i == 1 ? <CalendarBlock name="Item 1" startTime={startTime} endTime={endTime} /> : null}
                        <DayContainer></DayContainer>
                    </div>
                </div>
            )}
        </>
    )
}