/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

// get mealprovider details
export const getMealProvider = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/provider/meal-provider/mydata`,
        
        {
             headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                    "Content-Type": "application/json",
                  },
          next: {
            tags: ["MealProviderProfile"],
          },
        }
      );
      const data = await res.json();
      return data;
    } catch (error: any) {
      return Error(error.message);
    }
  };