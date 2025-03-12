/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { TMealsForm } from "@/types/meals";
import { revalidateTag } from "next/cache";
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
    revalidateTag("Meals");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};


// get single product
export const getSingleMeal = async (mealId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/meals/${mealId}`,
      {
        next: {
          tags: ["Meals"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};


// update meal
export const updateMeal = async (
  mealData:Partial<TMealsForm>,
  mealId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/providers/meals/update/${mealId}`,
      {
        method: "PATCH",
      
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mealData),
      }
    );
    revalidateTag("Meals");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};


// get all meals of mealprovider own
export const getAllProviderMeals = async (page?: string,limit?:string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/providers/meals/mymeals?limit=${limit}&page=${page}`,
        {
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          next: {
            tags: ["Meals"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };


//all meals for everyone
export const getAllMeals = async () => {
  try {
    console.log("Fetching meals from:", process.env.NEXT_PUBLIC_BASE_API);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/providers/meals`,
      {
        next: { tags: ["Meals"] },
      }
    );

    // console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    // console.log("Fetched meals data:", data);

    return data;
  } catch (error: any) {
    console.error("Error fetching meals:", error.message);
    return null;
  }
};


