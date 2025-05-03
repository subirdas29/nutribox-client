/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createContacts = async (data:FieldValues) => {

    console.log(data)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contact`, {
      method: "POST",
      headers: {
        // Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("Contacts");
    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};