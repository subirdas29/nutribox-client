/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createSubscribe = async (data:FieldValues) => {

    console.log(data)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subscribe`, {
      method: "POST",
      headers: {
        // Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("Subscribe");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};