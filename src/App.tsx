import { Separator } from "@radix-ui/react-separator"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar"
import CalendarContainer from "./components/calendar-container"
import { useState } from "react"
import { ButtonArrow } from "./components/button-arrow"

function App() {
  let [currentDay, setCurrentDay] = useState(new Date(Date.now()))

  function getStartOfWeek() {
    let dayOfWeek = currentDay.getDay();
    let startOfWeek = new Date(currentDay);
    startOfWeek.setDate(currentDay.getDate() - dayOfWeek)
    return startOfWeek.toLocaleDateString();
  }

  function getEndOfWeek() {
    let dayOfWeek = currentDay.getDay();
    let endOfWeek = new Date(currentDay);
    endOfWeek.setDate((6-dayOfWeek) + currentDay.getDate())
    return endOfWeek.toLocaleDateString();
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
              <ButtonArrow direction="left"/>
              <h1 className="text-center m-auto">{getStartOfWeek()} - {getEndOfWeek()}</h1>
              <ButtonArrow direction="right"/>
            </div>
          </header>
            <CalendarContainer />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
export default App
