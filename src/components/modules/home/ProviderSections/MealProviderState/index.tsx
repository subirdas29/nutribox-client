'use client';
import React from 'react';
import { Users, Globe, Clock, ShoppingCart, TrendingUp } from 'lucide-react';

const MealProviderStats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      value: '100MM+',
      label: 'Meals Delivered',
      description: 'Trusted by meal providers worldwide',
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      value: 'Global Reach',
      label: '12+ Countries',
      description: 'Serving customers across the globe',
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      value: '12+ Years',
      label: 'Experience',
      description: 'Helping meal businesses grow',
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      value: '$250M+',
      label: 'Revenue Generated',
      description: 'Annual sales through our platform',
    },

  ];

  return (
    <section className="py-20 bg-gradient-to-r from-green-50 to-white ">
      <div className=" mt-20 px-4 text-center">
        <h2 className="  text-3xl md:text-4xl font-bold text-green-900 mb-8">
          Trusted by Clients. Loved by Customers.
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-4 md:mx-12 lg:mx-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-green-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-green-700 mb-2">
                {stat.label}
              </p>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealProviderStats;