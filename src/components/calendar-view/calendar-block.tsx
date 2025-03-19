interface props {
    name: string
    startTime: Date
    endTime: Date
}

export default function CalendarBlock({name, startTime, endTime}:props) {
    const startMinutes = 0//startTime.getMinutes()
    const startHours = 0//startTime.getHours();

    const endMinutes = endTime.getMinutes()
    const endHours = endTime.getHours();
    
    const hourDiff = endHours - startHours
    const minuteDiff = endMinutes - startMinutes

    const topValue = ((startHours/24) + (startMinutes/(24*60))) * 100
    const heightValue = ((hourDiff/24) + (minuteDiff/(24*60))) * 100

    return (
        <div className=" absolute w-full bg-amber-600" style={{ top: topValue + "%", height: heightValue + "%"}}>
            <h1>{name}</h1>
        </div>
    )
}