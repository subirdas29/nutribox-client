"use client";

import * as React from "react";
import {
  Bot,

  Settings,
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
      title: "DashboardCustomer",
      url: "/customer/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Shop",
      url: "/customer/shop/category",
      icon: Bot,
      items: [
        { title: "Browse Meals", url: "/customer/shop/category" },
        { title: "Orders", url: "/customer/orders" },
        { title: "Brands", url: "/customer/shop/brand" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [{ title: "Profile", url: "/profile" }],
    },
  ],
  mealProviderNav: [
    {
      title: "DashboardProvider",
      url: "/mealprovider/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Meals",
      url: "/mealprovider/meals/allmeals",
      icon: Bot,
      items: [
        { title: "Manage Meals", url: "/mealprovider/meals/allmeals" },
        { title: "Create Meals", url: "/mealprovider/meals/post-meal-menu" },
        { title: "Manage Brands", url: "/mealprovider/brands" },
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
                  <h2 className="font-bold text-xl">NextMart</h2>
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
