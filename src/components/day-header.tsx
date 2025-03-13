interface props {
    day: String
}
export default function DayHeader({day}:props){
    return (
            <div className="h-1/20 bg-blue-50 align-middle">
                <h1 className="text-center">{day}</h1>
            </div>
    )
}