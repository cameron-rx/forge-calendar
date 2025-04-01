import { AppSidebar } from "./components/side-bar/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar"
import CalendarContainer from "./components/calendar-view/calendar-container"
import { ButtonArrow } from "./components/calendar-view/button-arrow"
import { Separator } from "./components/ui/separator"
import { getDateFromURLParams, getEndOfWeek, getStartOfWeek } from "./lib/utils"

export default function Week() {

  // Used to render the current month at top of week
  // Checks to see if week spans two months and displays both if so
  let currentDate = getStartOfWeek();
  let endDate = getEndOfWeek();
  let headerString = "";

  if (currentDate.getMonth() != endDate.getMonth()) {
    let firstMonth = currentDate.toLocaleDateString("en-US", {month: "short"})
    let secondMonth = endDate.toLocaleDateString("en-US", {month: "short", year: "numeric"})
    headerString = firstMonth + "-" + secondMonth
  } else {
    headerString = currentDate.toLocaleDateString("en-US", {month: "short", year: 'numeric'})
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
              <ButtonArrow direction="left" offset={-7}/>
              <h1 className="text-center m-auto">{headerString}</h1>
              <ButtonArrow direction="right" offset={+7}/>
            </div>
          </header>
            <CalendarContainer />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}