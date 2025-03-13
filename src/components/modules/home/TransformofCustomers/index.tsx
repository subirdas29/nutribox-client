
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {  Utensils, Clock,  Truck, Heart, Salad, Star, Shield, Gift } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';

// Import different images for each tab
import healthyMealsImg from '../../../../assets/transformimg/customers/healthy-meals.jpg';
import quickDeliveryImg from '../../../../assets/transformimg/customers/Quick Delivery.jpg';
import topChefsImg from '../../../../assets/transformimg/customers/Top Chefs.jpg';
import specialOffersImg from '../../../../assets/transformimg/customers/Special Offers.jpg';

const CustomerTransform = () => {
  const [activeTab, setActiveTab] = useState('Healthy Meals');
  const tabs = useMemo(() => ['Healthy Meals', 'Quick Delivery', 'Top Chefs', 'Special Offers'], []);

  // Different background colors for each tab
  const bgColors: Record<string, string> = {
   'Healthy Meals': 'bg-[#D4F0FC]',
    'Quick Delivery': 'bg-[#FFEEDB]',
    'Top Chefs': 'bg-[#E0FBE2]',
    'Special Offers': 'bg-[#FBE3E3]',
  };

  // Different images for each tab
  const tabImages: Record<string, StaticImageData> = {
        'Healthy Meals': healthyMealsImg,
        'Quick Delivery': quickDeliveryImg,
        'Top Chefs': topChefsImg,
        'Special Offers': specialOffersImg,
      };

  // Auto-rotate feature
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [tabs]);

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-white">
      <div className="mx-4 md:mx-12 lg:mx-32 px-4 text-center">
        <h1 className="text-3xl md:text-4xl  font-bold text-green-900 mb-12">
        Discover Delicious Meals
        </h1>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-green-900 text-white'
                  : 'bg-white text-green-900 border border-green-900 hover:bg-green-900 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="relative h-auto md:h-[400px]">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`absolute inset-0 p-8 rounded-lg shadow-lg transition-all duration-500 ${
                activeTab === tab ? 'opacity-100 scale-100 relative' : 'opacity-0 scale-95 absolute pointer-events-none'
              } ${bgColors[tab]}`}
            >
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-4 order-2 md:order-1 text-left">
                  <h2 className="text-2xl font-bold text-green-900 mb-4">{tab}</h2>
                  <ul className="text-gray-600 space-y-2">
                    {tab === 'Healthy Meals' && (
                      <>
                      <li className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-green-600" />
                        Fresh, Nutritious Ingredients
                      </li>
                      <li className="flex items-center gap-2">
                        <Salad className="w-5 h-5 text-green-600" />
                        Chef-Crafted Recipes
                      </li>
                      <li className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-green-600" />
                        Customizable Meal Plans
                      </li>
                      <li className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        100% Organic and Safe
                      </li>
                      <li className="flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-green-600" />
                        Perfect for All Diets
                      </li>
                    </>
                    )}
                    {tab === 'Quick Delivery' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-green-600" />
                          Fast and Reliable Delivery
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          On-Time Guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          Contactless Delivery
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-green-600" />
                          Real-Time Tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-green-600" />
                          Freshness Guaranteed
                        </li>
                      </>
                    )}
                      {tab === 'Top Chefs' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-green-600" />
                          World-Class Chefs
                        </li>
                        <li className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-green-600" />
                          Unique and Creative Recipes
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-green-600" />
                          Passion for Healthy Cooking
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          Hygienic and Safe Practices
                        </li>
                        <li className="flex items-center gap-2">
                          <Salad className="w-5 h-5 text-green-600" />
                          Focus on Nutrition
                        </li>
                      </>
                    )}
                   {tab === 'Special Offers' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-green-600" />
                          Exclusive Discounts
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-green-600" />
                          Loyalty Rewards
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-green-600" />
                          Seasonal Promotions
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          Money-Back Guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-green-600" />
                          Free Delivery on First Order
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Image */}
                <div className="order-1 md:order-2 w-full">
                  <Image
                    width={400}
                    height={400}
                    src={tabImages[tab]}
                    alt={tab}
                    className="rounded-lg shadow-md w-full md:w-[600px] h-[300px] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTransform;
