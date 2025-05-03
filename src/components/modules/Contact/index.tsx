/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createContacts } from "@/services/Contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Head from "next/head";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { contactSchema } from "./contactValidation";
// import { IContact } from "@/types/contact";

export default function ContactUs() {
  const form = useForm(
    {
      resolver: zodResolver(contactSchema),
    }
  )
   
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data)
    try {
      const res = await createContacts(data);
      console.log(res)
      if (res?.success) {
        toast.success(res?.message);
        form.reset()
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact us for any queries or support."
        />
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Contact Us
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Name</FormLabel>
                  <FormControl>
                    <Input type="name" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md mt-4">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md mt-4">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Write A Message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-5 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                "Send Message"
              )}
            </Button>
          </form>

         
        </Form>
      </div>
    </div>
  );
}
