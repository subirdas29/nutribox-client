import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clock, Settings, PieChart, Truck, ChefHat, Soup, Utensils, Coffee } from "lucide-react";
import { useUser } from "@/context/UserContext"; // Import user context
import banner from "../../../../../assets/banner/banner2.png";
import img1 from "../../../../../assets/banner/providerimage/img1.jpg";
import img2 from "../../../../../assets/banner/providerimage/img2.jpg";
import img3 from "../../../../../assets/banner/providerimage/img3.jpg";
import Link from "next/link";

export function HeroBannerProvider() {
  const { user } = useUser(); // Get user info


  const isMealProvider = user?.role === "mealprovider";
  

  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-r from-green-200 to-transparent">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={banner}
          alt="Meal provider banner"
          fill
          className="object-cover opacity-80 transition-opacity duration-500 hover:opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/50 to-transparent" />
      </div>

      <div className="container grid md:grid-cols-2 gap-12 items-center py-32 mx-12 md:mx-16 lg:mx-20">
        {/* Content */}
        <div className="space-y-6 max-w-2xl text-center md:text-left relative">
               {/* Animated Icons Around Text */}
               <div className="absolute -top-8 -left-8 animate-bounce">
            <ChefHat className="w-10 h-10 text-green-600" />
          </div>
          <div className="absolute top-90 -left-8 animate-pulse">
            <Soup className="w-10 h-10 text-green-600" />
          </div>
          <div className="absolute top-90 lg:left-120 -right-8 animate-bounce">
            <Utensils className="w-10 h-10 text-green-600" />
          </div>
          <div className="absolute -top-8 lg:left-120 -right-8 animate-pulse">
            <Coffee className="w-10 h-10 text-green-600" />
          </div>
          {/* Conditional Content */}
          {isMealProvider ? (
            <>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 transition-all duration-500 transform hover:text-primary">
                Grow Your Meal Business
                <span className="text-primary"> with Ease</span>
              </h1>
              <p className="text-xl text-gray-600 md:text-2xl transition-all duration-500 hover:text-gray-800">
                Streamline your operations, manage orders, and delight your customers with our powerful platform.
              </p>
              <Button
                size="lg"
                className="text-lg px-8 h-14 gap-2 bg-primary hover:bg-primary-dark transition duration-300 ease-in-out"
              >
                <Settings className="h-6 w-6" />
               <Link href='/mealprovider/dashboard'> Get Started Today</Link>
              </Button>
            </>
          ) : (
            <>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 transition-all duration-500 transform hover:text-primary">
                Start Your Meal Business Today
                <span className="text-primary"> with Ease</span>
              </h1>
              <p className="text-xl text-gray-600 md:text-2xl transition-all duration-500 hover:text-gray-800">
                Join MealBox and reach more customers effortlessly with your home-cooked meals.
              </p>
              <Button
                size="lg"
                className="text-lg px-8 h-14 gap-2 bg-primary hover:bg-primary-dark transition duration-300 ease-in-out"
              >
                <Settings className="h-6 w-6" />
               <Link href='/register'> Sign Up as a Meal Provider</Link>
              </Button>
            </>
          )}

          {/* Stats (Only visible for meal providers) */}
          {isMealProvider && (
            <div className="flex flex-wrap gap-6 pt-6 justify-center">
              <div className="flex items-center gap-2 mx-auto text-lg font-semibold text-primary hover:text-primary-dark transition duration-300">
                <Clock className="h-6 w-6" />
                <span className="font-medium">Real-Time Order Tracking</span>
              </div>
              <div className="flex items-center gap-2 mx-auto text-lg font-semibold text-primary hover:text-primary-dark transition duration-300">
                <PieChart className="h-6 w-6" />
                <span className="font-medium">Detailed Analytics</span>
              </div>
              <div className="flex items-center gap-2 mx-auto text-lg font-semibold text-primary hover:text-primary-dark transition duration-300">
                <Truck className="h-6 w-6" />
                <span className="font-medium">Efficient Delivery Tools</span>
              </div>
            </div>
          )}
        </div>

        {/* Floating Images */}
        <div className="relative hidden md:block h-[500px]">
          {/* Image 1 - Top Left */}
                  <div className="absolute left-0 lg:left-10 top-0 w-[300px] h-[300px] ">
                    <Image
                      src={img1}
                      alt="Meal 1"
                      width={300}
                      height={300}
                      className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
        
                  {/* Image 2 - Top Right */}
                  <div className="absolute right-0 lg:-right-10 top-40 w-[280px] h-[280px] ">
                    <Image
                      src={img2}
                      alt="Meal 2"
                      width={280}
                      height={280}
                      className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
        
                  {/* Image 3 - Bottom Center */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10 w-[260px] h-[260px] ">
                    <Image
                      src={img3}
                      alt="Meal 3"
                      width={260}
                      height={260}
                      className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                  </div>
        </div>
      </div>  
    </section>
  );
}
