/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "./registerValidation";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { user_roles } from "@/constant/role";
import { useRouter } from "next/navigation";
import Image from "next/image";
import register from "../../../../assets/register/register.png";

export default function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
    mode: "onChange",
  });

  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen  my-16 px-4 md:px-10 lg:px-20 gap-10">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={register}
          alt="Register"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover"
        />
      </div>

      {/* Register Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Register</h1>
          <p className="text-sm text-gray-600">Join us today and start your journey!</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem  className="my-4">
                  <FormLabel className="text-md">Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role Selection */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-md">Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {user_roles.map((role, idx) => (
                        <SelectItem key={idx} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-md">Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage>
                    {passwordConfirm && password !== passwordConfirm
                      ? "Password does not match"
                      : errors.passwordConfirm?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              disabled={!!(passwordConfirm && password !== passwordConfirm)}
              type="submit"
              className="mt-5 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
