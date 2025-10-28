import { AppSidebar } from "../side-bar/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { ButtonArrow } from "./button-arrow";
import { Separator } from "../ui/separator";
import { getEndOfWeek, getStartOfWeek } from "../../lib/utils";
import WeekView from "./week-view";
import DayView from "./day-view";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Week() {
  // Used to render the current month at top of week
  // Checks to see if week spans two months and displays both if so
  const isMobile = useIsMobile();

  const currentDate = getStartOfWeek();
  const endDate = getEndOfWeek();
  let weekHeaderString = "";
  const dayHeaderString = currentDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (currentDate.getMonth() != endDate.getMonth()) {
    const firstMonth = currentDate.toLocaleDateString("en-US", {
      month: "short",
    });
    const secondMonth = endDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    weekHeaderString = firstMonth + "-" + secondMonth;
  } else {
    weekHeaderString = currentDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 flex z-10 h-16 shrink-0 justify-start items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div
              id="WeekSelector"
              className="hidden md:flex justify-center align-middle justify-self-center ml-auto mr-auto"
            >
              <ButtonArrow direction="left" offset={-7} />
              <h1 className="text-center m-auto">{weekHeaderString}</h1>
              <ButtonArrow direction="right" offset={+7} />
            </div>
            <div
              id="DaySelector"
              className="flex md:hidden justify-center align-middle justify-self-center ml-auto mr-auto"
            >
              <ButtonArrow direction="left" offset={-1} />
              <h1 className="text-center m-auto">{dayHeaderString}</h1>
              <ButtonArrow direction="right" offset={+1} />
            </div>
          </header>
          {isMobile ? <DayView /> : <WeekView />}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
