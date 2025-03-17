import { AppSidebar } from "./components/side-bar/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar"
import CalendarContainer from "./components/calendar-view/calendar-container"
import { ButtonArrow } from "./components/ui/button-arrow"
import { Separator } from "./components/ui/separator"
import { getDateFromURLParams, getEndOfWeek, getStartOfWeek } from "./lib/utils"
import { useNavigate } from "react-router"

export default function Week() {
  let navigate = useNavigate()

  function navigateWeek(offset:number) {
    const currentWeek = getDateFromURLParams()
    currentWeek.setDate(currentWeek.getDate() + offset)

    const newYear = currentWeek.getFullYear();
    const newMonth = currentWeek.getMonth() + 1;
    const newDay = currentWeek.getDate() + 1;

    navigate(`/week/${newYear}/${newMonth}/${newDay}`)
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex z-10 h-16 shrink-0 justify-start items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div id="WeekSelector" className="flex justify-center align-middle justify-self-center ml-auto mr-auto">
              <ButtonArrow direction="left" onclick={()=> {}}/>
              <h1 className="text-center m-auto">{getStartOfWeek().toLocaleDateString()} - {getEndOfWeek().toLocaleDateString()}</h1>
              <ButtonArrow direction="right" onclick={() => {}}/>
            </div>
          </header>
            <CalendarContainer />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}