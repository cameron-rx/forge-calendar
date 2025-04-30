import * as React from "react"
import { Plus } from "lucide-react"

import { DatePicker } from "@/components/side-bar/date-picker"
import { NavUser } from "@/components/side-bar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import CreateTimeblockButton from "../timeblocks/create-timeblock"
import { useNavigate } from "react-router"
import { Button } from "../ui/button"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let navigate = useNavigate();
  const today = new Date(Date.now())
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate() 

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <CreateTimeblockButton />
        <Button className="w-9/10 ml-auto mr-auto"onClick={() => {navigate(`/app/${year}/${month}/${day}`)}}>Today</Button>
      </SidebarContent>
      <SidebarFooter>
        <img className="w-full h-auto" src="/forge-logo.png"></img>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
