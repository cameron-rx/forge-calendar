interface props {
    day: String
    date: Number
}
export default function DayHeader({day, date}:props){

    return (
            <div className="sticky z-10 top-16 h-1/20 bg-blue-50 align-middle">
                <h1 className="text-center">{day}</h1>
                <h1 className="text-center">{date.toString()}</h1>
            </div>
    )
}