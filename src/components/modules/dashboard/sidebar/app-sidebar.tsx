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
import logo from '../../../../assets/logo/logo.png'

import { useUser } from "@/context/UserContext";
import { IUser } from "@/types/user";
import Image from "next/image";

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
      url: "/customer/mypending-orders",
      icon: Bot,
      items: [
     
        { title: "Pending Orders", url: "/customer/mypending-orders" },
        { title: "On-Going Orders", url: "/customer/myongoing-orders" },
        { title: "Delivered Orders", url: "/customer/mydelivered-orders" },
        { title: "Cancelled Orders", url: "/customer/mycancelled-orders" },
      
      ],
    },
    {
      title: "Settings",
      url: "/customer/profile",
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
      url: "/mealprovider/ongoing-orders",
      icon: ShoppingCart,
      items: [
        { title: "Pending Orders", url: "/mealprovider/pending-orders" },
        { title: "On-Going Orders", url: "/mealprovider/ongoing-orders" },
        { title: "Delivered Orders", url: "/mealprovider/delivered-orders" },
        { title: "Cancelled Orders", url: "/mealprovider/cancelled-orders" },
      ],
    },
    {
      title: "Settings",
      url: "/mealprovider/profile",
      icon: Settings,
      items: [{ title: "Profile", url: "/mealprovider/profile" }],
    },
  ],
};

export function AppSidebar({ userData,...props }: {userData:IUser} & React.ComponentProps<typeof Sidebar>) {
 
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
                <div className="flex items-center justify-center gap-2">
                <Image src={logo} alt="logo" className="h-8 w-8" />
           
       
                  <h2 className="font-bold text-2xl">NutriBox</h2>
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
        <NavUser userData= {userData}/>
      </SidebarFooter>
    </Sidebar>
  );
}
