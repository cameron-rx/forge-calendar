import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface props {
    direction: string
    onclick: () => void
}


export function ButtonArrow({direction}:props) {

    function getDirection() {
        if (direction === "right") 
            return <ChevronRight />
        else 
            return <ChevronLeft />
    }

  return (
    <Button variant="outline" size="icon" className="m-3">
        {getDirection()}
    </Button>
  )
}
