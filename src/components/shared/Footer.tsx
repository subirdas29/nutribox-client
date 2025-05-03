/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import Link from "next/link";
import logo from '../../assets/logo/logo.png'
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { createSubscribe } from "@/services/Subscribe";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { subscribeSchema } from "./subscribeValidation";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem,  FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const Footer = () => {

    const form = useForm(
      {
        resolver: zodResolver(subscribeSchema),
        defaultValues:{
          email:""
        }
      }
    )
     
    const {
      formState: { isSubmitting },
    } = form;


     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data,'check')
        try {
          const res = await createSubscribe(data);
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
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className=" mx-6 md:mx-12 lg:mx-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                      <Image
                        src={logo}
                        
                        alt = 'footer-logo'
                        className="h-10 w-10"
                        />
                      <span className="text-3xl font-bold">NutriBox</span>
                      </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your premier destination for smart shopping. Discover quality products with unbeatable convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
         
            <div className="space-y-4">
              <h3 className="font-semibold uppercase text-sm tracking-wider">Shop</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/allmenu" className="hover:text-white transition">All Products</Link></li>
     
                <li><Link href="/cart" className="hover:text-white transition">My Cart</Link></li>
                <li><Link href="/allmenu" className="hover:text-white transition">Categories</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              </ul>
      
{/*             
            <div className="space-y-4">
              <h3 className="font-semibold uppercase text-sm tracking-wider">Support</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-white transition">Returns</Link></li>
              </ul>
            </div> */}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold uppercase text-sm tracking-wider">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>123 Shopping Street, Retail City, RC 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>1-800-Nutri-Box</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>nutri@bite.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/10 pt-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>
            <div >
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex justify-center">
              <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input  className="flex-1 px-2 lg:px-4 lg:py-2 rounded-md rounded-br-none rounded-tr-none  bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-green/50"  placeholder="Enter your email"  type="email" {...field} value={field.value || ""} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
        
              <Button type="submit" className="px-2 py-1 lg:px-6 lg:py-2 bg-white text-primary rounded-md rounded-bl-none rounded-tl-none text-sm font-semibold hover:bg-gray-100 transition">
                {isSubmitting ? (
                               <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                             ) : (
                               "Subscribe"
                             )}
              </Button>
              </div>
              </form>
            </Form>
              
            </div>
            <p className="text-sm text-gray-300 mt-3">
              Get 15% off your first order! Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>
            © {new Date().getFullYear()} Nutri Box. All rights reserved. 
            {/* <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-white transition">Terms of Service</a> */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;