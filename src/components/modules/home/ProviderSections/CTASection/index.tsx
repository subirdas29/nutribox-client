import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import banner2 from '../../../../../assets/banner/banner.jpg'
import Image from 'next/image';

const CTASection = () => {
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
        <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in-up">
          Ready to Transform Your Meal Business?
        </h2>
        <p className="text-lg text-green-200 mb-8 animate-fade-in-up delay-200">
          Join thousands of meal providers who are already thriving with our platform.
        </p>
        <Button 
          asChild 
          className="bg-white text-green-900 hover:bg-green-100 hover:scale-105 transition-transform duration-300 animate-fade-in-up delay-400"
        >
          <Link href="/signup">Get Started Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;