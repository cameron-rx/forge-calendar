import { getStartOfWeek } from "@/lib/utils"
import DayContainer from "./day-container"
import DayHeader from "./day-header"

export default function WeekContainer() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    // Create array for dates of week and pass to day container the given date
    let weekStartDate = getStartOfWeek().getDate();

    let weekDates = [...Array(7)].map(() => {
        return weekStartDate++;
    });
   
    return ( 
        <>
            {daysOfWeek.map((day, i) =>
                <div className="w-full">
                    <DayHeader day={day} date={weekDates[i]} />
                    <div className="border h-19/20  border-gray-50 border-solid">
                        <DayContainer></DayContainer>
                    </div>
                </div>
            )}
        </>
    )
}