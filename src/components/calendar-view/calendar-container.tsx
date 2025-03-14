import HoursTimeline from "./hours-timeline"
import WeekContainer from "./week-container"

export default function CalendarContainer() {

    return (
        <>
            <div id="calendarContainer" className="w-full h-full flex flex-row justify-evenly">
                <HoursTimeline/>
                <WeekContainer />
            </div>
        </>
    )
}