import { z } from "zod";

export const subscribeSchema = z.object({


    email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
     ),

});

