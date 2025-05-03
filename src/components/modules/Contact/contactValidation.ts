import { z } from "zod";

export const contactSchema = z.object({

    name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
    email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
     ),
     message: z
    .string({ required_error: "Message is required" })

});

