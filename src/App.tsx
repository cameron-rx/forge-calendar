import { Separator } from "@radix-ui/react-separator"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar"

function App() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <div id="calendarContainer" className="w-full h-dvh flex flex-row justify-evenly">
            {[...Array(6)].map(() => 
              <div className="border w-full border-gray-50 border-solid">
                {[...Array(23).keys()].map((_,i) =>
                <div className="relative w-full border" style={{ top: (((i+1)/24) * 100) + "%" }}></div>
                )}
              </div>

            )} 
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}
export default App
