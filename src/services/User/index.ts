"use server"

import { IUser } from "@/types/user";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// update meal
export const updateUser = async (
  mealData:IUser,
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

  export const getMyOrder = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/orders/myorder/alldata`,
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