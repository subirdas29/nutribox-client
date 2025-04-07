/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { IUser } from "@/types/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// update meal
export const updateUser = async (
  mealData:Partial<IUser>,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/profile-data`,
      {
        method: "PATCH",
      
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      }
    );
    revalidateTag("Profile");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};


export const getMe = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/my-data`,
      {
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["Profile"],
        },
      }
    );
    const data = await res.json();
    
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};



export const getMyOrder = async (page?: string,limit?:string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value || "";
    if (!token) return { data: [] };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders/myorder/alldata?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      cache: "no-store", 
    });

    if (!res.ok) return { data: [] };
    return await res.json();
  } catch (error) {
    return { data: [] };
  }
};
