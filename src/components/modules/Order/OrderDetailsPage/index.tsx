"use client"
import { useUser } from "@/context/UserContext";
import { IOrderDetails } from "../OrderDetails"
import { CustomerOrderView } from "./CustomerOrderView"
import { ProviderOrderView } from "./ProviderOrderView"


export const OrderRolePageDetails = ({ order }: { order: IOrderDetails }) => {
      const { user, setIsLoading } = useUser();
  return (
    <>
      {user?.role === 'customer' ? (
        <CustomerOrderView order={order} />
      ) : (
        <ProviderOrderView order={order} />
      )}
    </>
  )
}