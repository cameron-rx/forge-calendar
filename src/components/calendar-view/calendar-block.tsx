interface props {
    name: string
    startTime: Date
    endTime: Date
}

export default function CalendarBlock({name, startTime, endTime}:props) {
    let startMinutes = startTime.getMinutes()
    //let startHours = startTime.getHours();
    let startHours = 3;

    let endMinutes = endTime.getMinutes()
    let endHours = endTime.getHours();


    return (
        <div className="z-50 absolute w-full bg-amber-600" style={{ top: ((startHours/24)*100) + "%"}}>
            <h1>Calendar Item</h1>
            <p>{name}</p>
            <p>StartTime: {startTime.getHours() + ":" + startTime.getMinutes()}</p>
            <p>StartTime: {endTime.getHours() + ":" + endTime.getMinutes()}</p>
        </div>
    )
}