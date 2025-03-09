// app/page.tsx
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

interface Meal {
  id: number;
  name: string;
  category: string;
  price: number;
  ingredients: string[];
  portionSize: string;
  available: boolean;
  description: string;
  imageUrls: string[];
  dietaryPreferences: string[];
  mealProvider: string;
}

export default function AllMenu() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    portionSize: '',
    dietaryPreferences: [] as string[],
    availableOnly: false,
  });

  const meals: Meal[] = [
    {
      id: 1,
      name: 'Classic Burger',
      category: 'Snack',
      price: 300,
      ingredients: ['Bun', 'Patty', 'Lettuce', 'Tomato', 'Cheese', 'Sauce'],
      portionSize: 'medium',
      available: true,
      description: 'Juicy beef burger with fresh vegetables',
      imageUrls: ['/burger.jpg'],
      dietaryPreferences: ['Gluten-Free'],
      mealProvider: 'Burger Co'
    },
    {
      id: 2,
      name: 'Caesar Salad',
      category: 'Main Course',
      price: 450,
      ingredients: ['Chicken', 'Lettuce', 'Croutons', 'Parmesan', 'Dressing'],
      portionSize: 'large',
      available: true,
      description: 'Fresh classic Caesar salad with grilled chicken',
      imageUrls: ['/salad.jpg'],
      dietaryPreferences: ['Dairy-Free'],
      mealProvider: 'Healthy Kitchen'
    },
    {
      id: 3,
      name: 'Chocolate Cake',
      category: 'Dessert',
      price: 200,
      ingredients: ['Flour', 'Sugar', 'Cocoa', 'Eggs', 'Butter'],
      portionSize: 'small',
      available: false,
      description: 'Rich chocolate layer cake with frosting',
      imageUrls: ['/cake.jpg'],
      dietaryPreferences: ['Vegetarian'],
      mealProvider: 'Sweet Treats'
    },
  ];

  const applyFilters = (meal: Meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filters.category || meal.category === filters.category;
    const matchesPrice = meal.price >= filters.minPrice && meal.price <= filters.maxPrice;
    const matchesPortion = !filters.portionSize || meal.portionSize === filters.portionSize;
    const matchesDietary = filters.dietaryPreferences.length === 0 || 
      filters.dietaryPreferences.some(pref => meal.dietaryPreferences.includes(pref));
    const matchesAvailability = !filters.availableOnly || meal.available;

    return matchesSearch && matchesCategory && matchesPrice && 
           matchesPortion && matchesDietary && matchesAvailability;
  };

  const filteredMeals = meals.filter(applyFilters);

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className={`lg:sticky lg:top-8 lg:h-[calc(100vh-200px)] lg:overflow-y-auto 
            ${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-[300px]`}>
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">All Categories</option>
                    <option value="Snack">Snack</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <Slider
                    min={0}
                    max={1000}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={(value) => setFilters({
                      ...filters,
                      minPrice: value[0],
                      maxPrice: value[1],
                    })}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>${filters.minPrice}</span>
                    <span>${filters.maxPrice}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Portion Size</label>
                  <select
                    value={filters.portionSize}
                    onChange={(e) => setFilters({...filters, portionSize: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">All Portion Sizes</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dietary Preferences</label>
                  <div className="space-y-2">
                    {['Gluten-Free', 'Dairy-Free', 'Vegetarian', 'Vegan'].map((pref) => (
                      <div key={pref} className="flex items-center gap-2">
                        <Checkbox
                          id={pref}
                          checked={filters.dietaryPreferences.includes(pref)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                dietaryPreferences: [...filters.dietaryPreferences, pref],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                dietaryPreferences: filters.dietaryPreferences.filter(p => p !== pref),
                              });
                            }
                          }}
                        />
                        <label htmlFor={pref} className="text-sm">
                          {pref}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="available"
                    checked={filters.availableOnly}
                    onCheckedChange={(checked) => setFilters({...filters, availableOnly: !!checked})}
                  />
                  <label htmlFor="available" className="text-sm">
                    Show Available Only
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({
                    category: '',
                    minPrice: 0,
                    maxPrice: 1000,
                    portionSize: '',
                    dietaryPreferences: [],
                    availableOnly: false,
                  })}
                >
                  Reset Filters
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <Input
                placeholder="Search meals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:max-w-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMeals.map((meal) => (
                <Card key={meal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{meal.name}</CardTitle>
                    <p className="text-sm text-gray-500">{meal.mealProvider}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 mb-4">
                      <Image
                        src={meal.imageUrls[0]}
                        width={400}
                        height={400}
                        alt={meal.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <p className="text-gray-600 mb-2">{meal.description}</p>
                    <p className="font-bold">${meal.price}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {meal.dietaryPreferences.map((pref) => (
                        <span 
                          key={pref} 
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className={`text-sm ${meal.available ? 'text-green-600' : 'text-red-600'}`}>
                      {meal.available ? 'Available' : 'Out of Stock'}
                    </span>
                    <Button disabled={!meal.available}>
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}