import DayContainer from "./day-container"
import DayHeader from "./day-header"

export default function CalendarContainer() {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const hours = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", 
        "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", 
        "21:00", "22:00", "23:00"]
    

    return (
        <>
            <div id="calendarContainer" className="w-full h-full flex flex-row justify-evenly">
                <div className="block relative w-max top-1/20 min-h-19/20 min-w-[4rem]">
                    {hours.map((hour,i) =>
                        <div className="absolute inline left-1/5" style={{ top: `calc(${(i/24)*100+"%"} - 1em)` }}>
                            {hour}
                        </div>
                    )}
                </div>
                {daysOfWeek.map((day) =>
                    <div className="w-full">
                        <DayHeader day={day} />
                        <div className="border h-19/20  border-gray-50 border-solid">
                            <DayContainer></DayContainer>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}