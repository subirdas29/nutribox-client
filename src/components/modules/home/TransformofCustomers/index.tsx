/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Heart, Truck, Clock, Star, Utensils, Salad, Gift, Shield } from 'lucide-react';
import Image from 'next/image';

// Import images for each tab
import healthyMealsImg from '../../../../assets/menu/img1.jpg';
import quickDeliveryImg from '../../../../assets/menu/img2.jpg';
import topChefsImg from '../../../../assets/menu/img3.jpg';
import specialOffersImg from '../../../../assets/menu/img4.jpg';

const CustomerTransform = () => {
  const [activeTab, setActiveTab] = useState('Healthy Meals');
  const tabs = useMemo(() => ['Healthy Meals', 'Quick Delivery', 'Top Chefs', 'Special Offers'], []);

  const bgColors: Record<typeof tabs[number], string> = {
    'Healthy Meals': 'bg-[#D4F0FC]',
    'Quick Delivery': 'bg-[#FFEEDB]',
    'Top Chefs': 'bg-[#E0FBE2]',
    'Special Offers': 'bg-[#FBE3E3]',
  };

  const tabImages: Record<typeof tabs[number], any> = {
    'Healthy Meals': healthyMealsImg,
    'Quick Delivery': quickDeliveryImg,
    'Top Chefs': topChefsImg,
    'Special Offers': specialOffersImg,
  };

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
    <section className="py-20 bg-gradient-to-r from-blue-50 to-white mb-12 lg:mb-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-12">
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
        <div className="relative h-[500px] md:h-[400px]">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`absolute inset-0 p-8 rounded-lg shadow-lg transition-all duration-500 ${
                activeTab === tab ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              } ${bgColors[tab]}`}
            >
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-4 order-2 md:order-1">
                  <h2 className="text-2xl font-bold text-green-900 mb-4">{tab}</h2>
                  <ul className="text-left text-gray-600 space-y-2">
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
                <div className="order-1 md:order-2 w-full md:w-auto flex justify-center">
                  <Image
                    width={400}
                    height={400}
                    src={tabImages[tab]}
                    alt={tab}
                    className="rounded-lg shadow-md w-full max-w-[300px] md:max-w-[400px]"
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
