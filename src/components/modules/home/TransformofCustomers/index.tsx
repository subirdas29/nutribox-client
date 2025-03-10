'use client';
import React, { useState, useEffect } from 'react';
import { Heart, Truck, Clock, Star, Utensils, Salad, Gift, Shield } from 'lucide-react';
import Image from 'next/image';
import customerBanner from '../../../../assets/banner/banner.jpg';

const CustomerTransform = () => {
  const [activeTab, setActiveTab] = useState('Healthy Meals');
  const tabs = ['Healthy Meals', 'Quick Delivery', 'Top Chefs', 'Special Offers'];

  // Auto-rotate feature
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prevTab) => {
        const currentIndex = tabs.indexOf(prevTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, [tabs]);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8">
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
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-blue-900 border border-blue-900 hover:bg-blue-900 hover:text-white'
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
              className={`absolute inset-0 p-8 bg-white rounded-lg shadow-lg transition-all duration-500 ${
                activeTab === tab
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-4 order-2 md:order-1">
                  <h2 className="text-2xl font-bold text-blue-900 mb-4">{tab}</h2>
                  <ul className="text-left text-gray-600 space-y-2">
                    {tab === 'Healthy Meals' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-blue-600" />
                          Fresh, Nutritious Ingredients
                        </li>
                        <li className="flex items-center gap-2">
                          <Salad className="w-5 h-5 text-blue-600" />
                          Chef-Crafted Recipes
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-blue-600" />
                          Customizable Meal Plans
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          100% Organic and Safe
                        </li>
                        <li className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-blue-600" />
                          Perfect for All Diets
                        </li>
                      </>
                    )}
                    {tab === 'Quick Delivery' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-blue-600" />
                          Fast and Reliable Delivery
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          On-Time Guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          Contactless Delivery
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-blue-600" />
                          Real-Time Tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-blue-600" />
                          Freshness Guaranteed
                        </li>
                      </>
                    )}
                    {tab === 'Top Chefs' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-blue-600" />
                          World-Class Chefs
                        </li>
                        <li className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-blue-600" />
                          Unique and Creative Recipes
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-blue-600" />
                          Passion for Healthy Cooking
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          Hygienic and Safe Practices
                        </li>
                        <li className="flex items-center gap-2">
                          <Salad className="w-5 h-5 text-blue-600" />
                          Focus on Nutrition
                        </li>
                      </>
                    )}
                    {tab === 'Special Offers' && (
                      <>
                        <li className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-blue-600" />
                          Exclusive Discounts
                        </li>
                        <li className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-blue-600" />
                          Loyalty Rewards
                        </li>
                        <li className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-blue-600" />
                          Seasonal Promotions
                        </li>
                        <li className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-blue-600" />
                          Money-Back Guarantee
                        </li>
                        <li className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-blue-600" />
                          Free Delivery on First Order
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Image */}
                <div className="order-1 md:order-2 w-full md:w-auto">
                  <Image
                    width={400}
                    height={400}
                    src={customerBanner}
                    alt={tab}
                    className="rounded-lg shadow-md w-full md:w-[400px]"
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