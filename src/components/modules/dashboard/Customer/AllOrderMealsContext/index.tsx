/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { IOrderCartMeal } from "@/types/cart";
import { createContext, ReactNode, useContext, useMemo } from "react";


interface AllOrderMealsContextProps {
    myorders: IOrderCartMeal[];
    children: ReactNode;
  }
const AllOrderMealsContext = createContext<any[]>([])

export const AllOrderMealsCustomer:React.FC<AllOrderMealsContextProps> =({
    children,
    myorders,
})=>{
    const allOrderMeals = useMemo(() => {
      
        return myorders?.flatMap((order) =>
          order.selectedMeals.map((meal) => ({
            ...meal,
            orderId: order._id,
            deliveryDate: order.deliveryDate,
            deliveryAddress: order.deliveryAddress,
            totalPrice: meal.orderPrice,
            transaction: order.transaction,
            createdAt: order.createdAt,
          }))
        );
      }, [myorders]);

      console.log(allOrderMeals,'checking vai')

      return (
        <AllOrderMealsContext.Provider value={allOrderMeals}>{children}</AllOrderMealsContext.Provider>
      )

}

export const useAllOrderMeals = ()=>{
    return useContext(AllOrderMealsContext)
}