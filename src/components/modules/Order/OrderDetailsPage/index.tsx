"use client"
import { useUser } from "@/context/UserContext";



import { Loader2 } from "lucide-react";
import { IOrderCartMeal } from "@/types/cart";
import { CustomerOrderView } from "./CustomerOrderView";
import { ProviderOrderView } from "./MealProviderOrderView";


export type OrderStatus =  "Pending" | "In-Progress" | "Delivered" | "Cancelled";
export type BankStatus =  'Failed' | 'Success' 


export const OrderRolePageDetails = ({ orders }: { orders: IOrderCartMeal }) => {

  const { user } = useUser();

  if (!user) {
    return  <Loader2 className="h-8 w-8 animate-spin min-h-screen text-primary" />
  }
  

  return (
    <div >
      {user?.role === 'customer' ? (
        <CustomerOrderView order={orders} />
      ) : (
        <ProviderOrderView order={orders} />
      )}
    </div>
  )
}
