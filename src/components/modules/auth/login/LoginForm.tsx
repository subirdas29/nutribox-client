/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
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
import { toast } from "sonner";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "./loginValidation";
import { Loader2 } from "lucide-react";
import { useUser } from "@/context/UserContext";
import Image from "next/image";

import login from "../../../../assets/login/login.png";

export default function LoginForm() {

  const [credentials,setCredentials] = useState({email:"",password:""})

  const defaultLoginUser = {
    email:"kanakdas209@gmail.com",
    password:"12345678"
  }
  const defaultLoginMealProvider={
    email:"subirdas1045@gmail.com",
    password:"12345678"
  }
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: credentials
  });

  useEffect(() => {
    if (credentials) {
      form.reset(credentials);
    }
  }, [credentials, form])

  const {
    formState: { isSubmitting },
  } = form;

  const { setIsLoading } = useUser();
  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
          setIsLoading(false);
        } else {
          router.push("/");
          setIsLoading(false);
        }
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen my-16 px-8 md:px-16 lg:px-20 gap-10 ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={login}
          alt="Login"
          className="w-full max-w-sm md:max-w-md lg:max-w-lg object-cover"
        />
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
          <p className="text-sm text-gray-600">Welcome Back!</p>
        </div>
        <div className="flex justify-center my-6 px-4 gap-2">
          <Button onClick={()=>setCredentials(defaultLoginUser)}>
            User Credentials
          </Button>
          <Button onClick={()=>setCredentials(defaultLoginMealProvider)}>
            Meal-Provider Credentials
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-md ">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex mt-4 justify-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
                onChange={handleReCaptcha}
              />
            </div>

            <Button
              disabled={!reCaptchaStatus}
              type="submit"
              className="mt-5 w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md"
            >
              {isSubmitting ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : "Login"}
            </Button>
          </form>
        </Form>

        <p className="text-sm text-gray-600 text-center mt-4">
        {`Don't have an account?`}{" "}
          <Link href="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
