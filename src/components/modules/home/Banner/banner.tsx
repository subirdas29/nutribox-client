import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Salad, HeartHandshake, Bike } from "lucide-react";
import banner from '../../../../assets/banner/banner.jpg';
import img1 from '../../../../assets/banner/allimage/joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg'
import img2 from '../../../../assets/banner/allimage/lily-banse--YHSwy6uqvk-unsplash.jpg'
import img3 from '../../../../assets/banner/allimage/rachel-park-hrlvr2ZlUNk-unsplash.jpg'

export function HeroBanner() {
  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-r from-green-200  to-transparent">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={banner}
          alt="Healthy meals"
          fill
          className="object-cover opacity-80 transition-opacity duration-500 hover:opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/50 to-transparent" />
      </div>

      <div className="container grid md:grid-cols-2 gap-12 items-center py-32 mx-12 md:mx-16 lg:mx-20">
        {/* Content */}
        <div className="space-y-6 max-w-2xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 transition-all duration-500 transform hover:text-primary">
            Fresh, Healthy Meals 
            <span className="text-primary"> Delivered Daily</span>
          </h1>
          <p className="text-xl text-gray-600 md:text-2xl transition-all duration-500 hover:text-gray-800">
            Chef-prepared meals designed for your lifestyle.
          </p>
          
          <Button size="lg" className="text-lg px-8 h-14 gap-2 bg-primary hover:bg-primary-dark transition duration-300 ease-in-out">
            <Salad className="h-6 w-6" />
            Get Started
          </Button>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-6 justify-center">
            <div className="flex items-center gap-2 mx-auto text-lg font-semibold text-primary hover:text-primary-dark transition duration-300">
              <Clock className="h-6 w-6" />
              <span className="font-medium">Ready in As fast as</span>
            </div>
            <div className="flex items-center gap-2 mx-auto text-lg font-semibold text-primary hover:text-primary-dark transition duration-300">
              <HeartHandshake className="h-6 w-6" />
              <span className="font-medium">100% Satisfaction</span>
            </div>
            <div className="flex items-center gap-2 mx-auto text-lg font-semibold text-primary hover:text-primary-dark transition duration-300">
              <Bike className="h-6 w-6" />
              <span className="font-medium">Free Delivery</span>
            </div>
          </div>
        </div>

        {/* Floating Food Images */}
        <div className="relative hidden md:block h-[500px]">
          <Image
            src={img1}
            alt="Meal 1"
            width={300}
            height={300}
            className="absolute left-0 top-0 shadow-xl rounded-2xl animate-float hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img2}
            alt="Meal 2"
            width={280}
            height={280}
            className="absolute right-0 top-20 shadow-xl rounded-2xl animate-float-delayed hover:scale-105 transition-transform duration-300"
          />
          <Image
            src={img3}
            alt="Meal 3"
            width={260}
            height={260}
            className="absolute left-10 bottom-0 shadow-xl rounded-2xl animate-float hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}
