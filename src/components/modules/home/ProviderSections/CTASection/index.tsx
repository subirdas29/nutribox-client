import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext"; 
import banner2 from "../../../../../assets/ctaimg/img.jpg";

const CTASection = () => {
  const { user } = useUser(); // Get user details

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={banner2}
          alt="Healthy meals"
          fill
          className="object-cover opacity-80 transition-opacity duration-500 hover:opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent" />
      </div> 

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {!user ? (
          // 🔹 When NO ONE is logged in
          <>
            <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
              Start Your Own Meal Business Today!
            </h2>
            <p className="text-lg text-green-100 mb-8 animate-fade-in-up delay-200">
              Join thousands of meal providers growing their business with us.
            </p>
            <Button 
              asChild 
              className="bg-white text-green-900 hover:bg-green-100 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400"
            >
              <Link href="/register">Become a Meal Provider</Link>
            </Button>
          </>
        ) : user.role === "customer" ? (
          // 🔹 When a CUSTOMER is logged in
          <>
            <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
              Want to Start Your Own Meal Business?
            </h2>
            <p className="text-lg text-green-200 mb-8 animate-fade-in-up delay-200">
              Turn your passion for food into a business today!
            </p>
            <Button 
              asChild 
              className="bg-white text-green-900 hover:bg-green-100 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400"
            >
              <Link href="/register">Become a Meal Provider</Link>
            </Button>
          </>
        ) : (
          // 🔹 When a MEAL PROVIDER is logged in
          <>
            <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
              Grow Your Customer Base and Expand Your Business!
            </h2>
            <p className="text-lg text-green-200 mb-8 animate-fade-in-up delay-200">
              Connect with more customers and take your meal business to the next level.
            </p>
            <Button 
              asChild 
              className="bg-white text-green-900 hover:bg-green-100 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400"
            >
              <Link href="/mealprovider/allorders">Find Customers</Link>
            </Button>
          </>
        )}
      </div>
    </section>
  );
};

export default CTASection;
