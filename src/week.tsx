import { AppSidebar } from "./components/side-bar/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar"
import CalendarContainer from "./components/calendar-view/calendar-container"
import { ButtonArrow } from "./components/calendar-view/button-arrow"
import { Separator } from "./components/ui/separator"
import { getEndOfWeek, getStartOfWeek } from "./lib/utils"

export default function Week() {

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
              <h1 className="text-center m-auto">{getStartOfWeek().toLocaleDateString()} - {getEndOfWeek().toLocaleDateString()}</h1>
              <ButtonArrow direction="right" offset={+7}/>
            </div>
          </header>
            <CalendarContainer />
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}