import DayContainer from "./day-container"
import DayHeader from "./day-header"

export default function WeekContainer() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
   
    return ( 
        <>
            {daysOfWeek.map((day) =>
                <div className="w-full">
                    <DayHeader day={day} date={0} />
                    <div className="border h-19/20  border-gray-50 border-solid">
                        <DayContainer></DayContainer>
                    </div>
                </div>
            )}
        </>
    )
}