"use server"

import { TMealsForm } from "@/types/meals";
import { cookies } from "next/headers";



export const createMeals = async (meals: TMealsForm) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/menu`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meals),
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// get all products
export const getAllMeals = async (page?: string,limit?:string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/providers/meals?limit=${limit}&page=${page}`,
        {
          next: {
            tags: ["PRODUCT"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };

