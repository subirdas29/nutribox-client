"use client";

import * as React from "react";
import {
  Bot,
  Settings,
  ShoppingCart,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";

import { useUser } from "@/context/UserContext";

const data = {
  customerNav: [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Meals",
      url: "/customer/myorder",
      icon: Bot,
      items: [
     
        { title: "Meal Orders", url: "/customer/myorder" },
      
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [{ title: "Profile", url: "/customer/profile" }],
    },
  ],
  mealProviderNav: [
    {
      title: "Dashboard",
      url: "/mealprovider/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Manage Meals",
      url: "/mealprovider/meals/allmeals",
      icon: Bot,
      items: [
        { title: "All Meals", url: "/mealprovider/meals/allmeals" },
        { title: "Create Meals", url: "/mealprovider/meals/post-meal-menu" },
      ],
    },
    {
      title: "Manage Orders",
      url: "/mealprovider/allorders",
      icon: ShoppingCart,
      items: [
        { title: "All Orders", url: "/mealprovider/allorders" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [{ title: "Profile", url: "/mealprovider/profile" }],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser(); 
  
  const navItems =
    user?.role === "mealprovider" ? data.mealProviderNav : data.customerNav;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  {/* <Logo /> */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">NutriBite</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
