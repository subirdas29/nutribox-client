"use client"
import { useUser } from "@/context/UserContext";

import { CustomerOrderView } from "./CustomerOrderView"
import { ProviderOrderView } from "./ProviderOrderView"

import { Loader2 } from "lucide-react";

export type OrderStatus =  'pending' | 'in-progress' | 'delivered' | 'cancelled'
export type BankStatus =  'Failed' | 'Success' |'Initiate'

export interface IOrderDetails {
  _id:string
  status: OrderStatus
  mealName:string
  totalPrice: number
  deliveryDate: Date
  deliveryTime: string
  deliveryAddress:string
  orderQuantity:1;
  portionSize:string
  customizations: string[]
  specialInstructions:string
  editable: boolean
  transaction: {
    id: string,
    transactionStatus: string,
    bank_status: 'Failed' | 'Success' |'Initiate' ,
    sp_code: string,
    sp_message: string,
    method: string,
    date_time: string,
  },
}

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
