import * as React from "react";

import { DatePicker } from "@/components/side-bar/date-picker";
import { NavUser } from "@/components/side-bar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import CreateTimeblockButton from "../timeblocks/create-timeblock";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { userInfo } from "./api";
import Forge from "../forge/forge";

// This is sample data.
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  let navigate = useNavigate();
  const today = new Date(Date.now());
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  let [user, setUser] = useState({
    email: "placeholder.email.com",
    name: "",
    avatar: "/avatars/shadcn.jpg",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const json = await userInfo();
        if (json) {
          setUser({
            email: json.email,
            name: "",
            avatar: "/avatars/shadcn.jpg",
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <CreateTimeblockButton />
        <Button
          className="w-9/10 justify-self-center self-center"
          onClick={() => {
            navigate(`/app/${year}/${month}/${day}`);
          }}
        >
          Today
        </Button>
        <SidebarSeparator />
        <Forge />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
