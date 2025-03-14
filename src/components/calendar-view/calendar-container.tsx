import DayContainer from "./day-container"
import DayHeader from "./day-header"
import HoursTimeline from "./hours-timeline"

export default function CalendarContainer() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    return (
        <>
            <div id="calendarContainer" className="w-full h-full flex flex-row justify-evenly">
                <HoursTimeline/>
                {daysOfWeek.map((day) =>
                    <div className="w-full">
                        <DayHeader day={day} date={0}/>
                        <div className="border h-19/20  border-gray-50 border-solid">
                            <DayContainer></DayContainer>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}