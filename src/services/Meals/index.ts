/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { TMealsForm } from "@/types/meals";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";



export const createMeals = async (meals: TMealsForm) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/allmeals/menu`, {
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
      `${process.env.NEXT_PUBLIC_BASE_API}/allmeals/meals/${mealId}`,
      {
        next: {
          tags: ["Meals"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};


// update meal
export const updateMeal = async (
  mealData:Partial<TMealsForm>,
  mealId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/allmeals/meals/update/${mealId}`,
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
        `${process.env.NEXT_PUBLIC_BASE_API}/allmeals/meals/mymeals?limit=${limit}&page=${page}`,
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
export const getAllMeals = async (page?: string,limit?:string, query?:{[key:string]:string | string[] | undefined}) => {
  try {
    
    const params = new URLSearchParams();

    if(query?.price){
      params.append("minPrice","0")
      params.append("maxPrice",query?.price.toString())
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/allmeals/meals?limit=${limit}&page=${page}&${params}`,
      {
        next: { tags: ["Meals"] },
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();


    return data;
  } catch (error: any) {
    console.error("Error fetching meals:", error);
    return null;
  }
};


