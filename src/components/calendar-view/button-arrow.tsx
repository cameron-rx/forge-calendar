import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"
import { getDateFromURLParams } from "@/lib/utils"

interface props {
    direction: string
    offset: number
}


export function ButtonArrow({direction, offset}:props) {
    let navigate = useNavigate()
    const currentWeek = getDateFromURLParams()
    currentWeek.setDate(currentWeek.getDate() + offset)

    const newYear = currentWeek.getFullYear();
    const newMonth = currentWeek.getMonth() + 1;
    const newDay = currentWeek.getDate() + 1;


    function getDirection() {
        if (direction === "right") 
            return <ChevronRight />
        else 
            return <ChevronLeft />
    }

  return (
    <Button variant="outline" size="icon" className="m-3" onClick={() => navigate(`/app/${newYear}/${newMonth}/${newDay}`)}>
        {getDirection()}
    </Button>
  )
}
