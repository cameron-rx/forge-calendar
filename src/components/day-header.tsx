interface props {
    day: String
}
export default function DayHeader({day}:props){
    return (
            <div className="sticky z-10 top-16 h-1/20 bg-blue-50 align-middle">
                <h1 className="text-center">{day}</h1>
            </div>
    )
}