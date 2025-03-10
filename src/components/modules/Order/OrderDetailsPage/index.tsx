"use client"
import { useUser } from "@/context/UserContext";
import { IOrderDetails } from "../OrderDetails"
import { CustomerOrderView } from "./CustomerOrderView"
import { ProviderOrderView } from "./ProviderOrderView"

import { Loader2 } from "lucide-react";

export const OrderRolePageDetails = ({ order }: { order: IOrderDetails }) => {
  const { user } = useUser();



  if (!user) {
    return  <Loader2 className="h-8 w-8 animate-spin min-h-screen text-primary" />
  }
  

  return (
    <div >
      {user?.role === 'customer' ? (
        <CustomerOrderView order={order} />
      ) : (
        <ProviderOrderView order={order} />
      )}
    </div>
  )
}
