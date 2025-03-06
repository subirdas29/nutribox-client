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
import { loginUser, reCaptchaTokenVerification} from "@/services/AuthService";

import { useState } from "react";
import {  useRouter, useSearchParams } from "next/navigation";
import { loginSchema } from "./loginValidation";
// import Logo from "@/assets/svgs/Logo";

export default function LoginForm() {
  const form = useForm(
    {
    resolver: zodResolver(loginSchema),
  }
);

  const {
    formState: { isSubmitting },
  } = form;


  const [reCaptchaStatus, setReCaptchaStatus]= useState(false)

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath")
  const router = useRouter()

const handleReCaptcha = async(value:string | null)=>{
    
    try{
        const res = await reCaptchaTokenVerification(value!)
        if(res?.success){
            setReCaptchaStatus(true)

        }
    }
    catch(err:any){
        console.error(err)
    }
}

const onSubmit:SubmitHandler<FieldValues> = async (data) =>{

    try{
        const res = await loginUser(data)
        if(res?.success){

            toast.success(res?.message)
            if(redirect){
              router.push(redirect)
            }
            else{
             router.push("/") 
            }
        }
        else{
            toast.success(res?.message)
        }
    }
    catch(err:any){
        console.error(err)
    }

}

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center space-x-4 ">
        {/* <Logo /> */}
        <div>
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">
            Welcome Back!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
       
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mt-6">Email</FormLabel>
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
              <FormItem>
                <FormLabel className="mt-3">Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
   
          <div className="flex mt-3">
          <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!} onChange = {handleReCaptcha} className="mx-auto"/>
          </div>

          <Button
          disabled={reCaptchaStatus? false:true}
            type="submit"
            className="mt-5 w-full"
          >
          
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
       Do not have you account?
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
}