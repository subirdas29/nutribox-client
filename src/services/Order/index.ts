/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"



import { IOrderCartMeal } from "@/types/cart";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createOrder = async (order: IOrderCartMeal) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    revalidateTag("Order");
    console.log(res)
    return await res.json();
  } catch (error: any) {
    console.log(error,"error")
    return Error(error);
  }
};



// get single product
export const getSingleOrder = async (orderId: string) => {

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`,
        {
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          next: {
            tags: ["Order"],
          },
        }
      );
      const data = await res.json();
   
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

//get single Meal with Common delivery Data
  export const getSingleMealOrder = async (orderId: string,mealId:string) => {

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}/meal/${mealId}`,
        {
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          next: {
            tags: ["Order"],
          },
        }
      );
      const data = await res.json();
   
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };



  export const getAllMealProviderOrder = async (page?: string,limit?:string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/orders/allorder/mealprovider?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          next: {
            tags: ["Order"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };




  export const verifyOrder = async (orderId:string) => {
    try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/verify?order_id=${orderId}`, 
        {
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          next: {
            tags: ["Order"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };




  // update order
  export const updateOrder = async (
    orderData:Partial<IOrderDetails>,
    orderId: string
  ): Promise<any> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/orders/orderdetails/${orderId}`,
        {
          method: "PATCH",
        
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );
      revalidateTag("Order");
      return await res.json();
    } catch (error: any) {
      return Error(error);
    }
  };


