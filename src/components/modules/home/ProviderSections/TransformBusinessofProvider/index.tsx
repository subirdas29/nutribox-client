'use client';
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Users, Utensils, Monitor, Clock, BookOpen, Camera, Truck, PieChart } from 'lucide-react';
import Image from 'next/image';
import sectionBanner from '../../../../../assets/banner/banner.jpg';

const MealProviderBusinessTransform = () => {
  const [activeTab, setActiveTab] = useState('Food Brands');
  const tabs = ['Food Brands', 'Retailers', 'Kitchen Appliances', 'Food Media'];

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
    <section className="py-20 bg-gradient-to-r from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-8">
          Let’s Transform Your Meal Business
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
              className={`absolute inset-0 p-8 bg-white rounded-lg shadow-lg transition-all duration-500 ${
                activeTab === tab
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-4 order-2 md:order-1">
                  <h2 className="text-2xl font-bold text-green-900 mb-4">{tab}</h2>
                  <ul className="text-left text-gray-600 space-y-2">
                    {tab === 'Food Brands' && (
                      <>
                        <li className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-green-600" />
                          Drive Incremental Sales
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          Reach New Audiences
                        </li>
                        <li className="flex items-center gap-2">
                          <Monitor className="w-5 h-5 text-green-600" />
                          Gain 1P Data and Insights
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-green-600" />
                          Promote Your Products in Recipes
                        </li>
                        <li className="flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-green-600" />
                          Optimize Ad Spend
                        </li>
                      </>
                    )}
                    {tab === 'Retailers' && (
                      <>
                        <li className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-green-600" />
                          Expand Your Customer Base
                        </li>
                        <li className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-green-600" />
                          Streamline Inventory Management
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          Enhance Customer Experience
                        </li>
                        <li className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-green-600" />
                          Improve Delivery Efficiency
                        </li>
                        <li className="flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-green-600" />
                          Leverage Data Analytics
                        </li>
                      </>
                    )}
                    {tab === 'Kitchen Appliances' && (
                      <>
                        <li className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-green-600" />
                          Showcase Your Products
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          Increase Brand Visibility
                        </li>
                        <li className="flex items-center gap-2">
                          <Utensils className="w-5 h-5 text-green-600" />
                          Collaborate with Chefs
                        </li>
                        <li className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          Drive Sales with Promotions
                        </li>
                        <li className="flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-green-600" />
                          Access Customer Insights
                        </li>
                      </>
                    )}
                    {tab === 'Food Media' && (
                      <>
                        <li className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-green-600" />
                          Create Engaging Content
                        </li>
                        <li className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-green-600" />
                          Reach Food Enthusiasts
                        </li>
                        <li className="flex items-center gap-2">
                          <Camera className="w-5 h-5 text-green-600" />
                          Monetize Your Platform
                        </li>
                        <li className="flex items-center gap-2">
                          <ShoppingCart className="w-5 h-5 text-green-600" />
                          Collaborate with Brands
                        </li>
                        <li className="flex items-center gap-2">
                          <PieChart className="w-5 h-5 text-green-600" />
                          Leverage Analytics
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
                    src={sectionBanner}
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

export default MealProviderBusinessTransform;