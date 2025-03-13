// app/page.tsx
"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { TMealProvider } from '@/types/meals';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { currencyFormatter } from '@/lib/currencyFormatter';
import Link from 'next/link';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface Meal {
  _id: string;
  name: string;
  category: string;
  price: number;
  ingredients: string[];
  portionSize: string;
  available: boolean;
  description: string;
  imageUrls: string[];
  dietaryPreferences: string[];
  mealProvider: TMealProvider;
  rating:number;
}

export default function AllMenu({menu}:{menu:Meal[]}) {
  
  console.log(menu,'menu')
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    name:[] as string[],
    providerName:[] as string[],
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    portionSize: '',
    dietaryPreferences: [] as string[],
    availableOnly: false,
    ingredients:[] as string[],
    cuisine: [] as string[],
    rating: null as number | null ,

  });

  const ingredients = [...new Set(menu?.flatMap((ingre)=>ingre.ingredients))]
  const dietary = [...new Set(menu?.flatMap((diet)=>diet.dietaryPreferences))]
  
  const cuisine = [...new Set(menu?.flatMap(cuis =>cuis.mealProvider.cuisineSpecialties))]
  const name = menu?.map(meal=>meal?.name)

  const providerName = [...new Set(menu?.flatMap((name)=>name.mealProvider.userId.name))]

  const handleRatingFilter = (rating:number) =>{
    setFilters({...filters,rating})
  }
  
 
 
  const applyFilters = (meal: Meal) => {
    const matchesSearch = meal?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal?.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filters?.category || meal?.category === filters?.category;
    const matchesMealName = filters?.name.length === 0 || filters?.name.some(pref => meal?.name.includes(pref))
    const matchesProviderName = filters?.providerName.length === 0 || filters?.providerName.some(pref => meal?.mealProvider?.userId?.name.includes(pref))
    const matchesPrice = meal?.price >= filters?.minPrice && meal?.price <= filters?.maxPrice;
    const matchesPortion = !filters?.portionSize || meal?.portionSize === filters?.portionSize;
    const matchesDietary = filters?.dietaryPreferences.length === 0 || 
      filters?.dietaryPreferences.some(pref => meal?.dietaryPreferences.includes(pref));
    const matchesIngredients = filters?.ingredients.length === 0 || filters?.ingredients.some(pref => meal?.ingredients.includes(pref))
    const matchesCuisine = filters?.cuisine.length === 0 || filters?.cuisine.some(pref => meal?.mealProvider?.cuisineSpecialties.includes(pref))
    const matchesAvailability = !filters?.availableOnly || meal?.available;

    const matchesRating = filters?.rating === null || Math.floor(meal?.rating as number) === filters?.rating

    return matchesSearch && matchesCategory && matchesPrice && 
           matchesPortion && matchesDietary && matchesAvailability && matchesIngredients && matchesCuisine && matchesRating && matchesMealName && matchesProviderName ;
  };

  const filteredMeals = menu?.filter(applyFilters);

  return (
    <div className="min-h-screen bg-gray-50">
     
      <main className="mx-12 md:mx-16 lg:mx-20 px-4 py-8">
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
                <CardTitle className='font-bold text-xl'>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">

                 {/* cuisine */}
                 <div>
                  <label className="block text-lg font-semibold mb-2 ">Meal Name</label>
                  <div className="space-y-2">
                    {name?.map((pref) => (
                      <div key={pref} className="flex items-center gap-2">
                        <Checkbox
                          id={pref}
                          checked={filters.name.includes(pref)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                name: [...filters.name, pref],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                name: filters.name.filter(p => p !== pref),
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
                {/* ProviderName */}
                 <div>
                  <label className="block text-lg font-semibold mb-2 ">Meal Provider Name</label>
                  <div className="space-y-2">
                    {providerName?.map((pref) => (
                      <div key={pref} className="flex items-center gap-2">
                        <Checkbox
                          id={pref}
                          checked={filters.providerName.includes(pref)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                providerName: [...filters.providerName, pref],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                providerName: filters.providerName.filter(p => p !== pref),
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
                <div>
                  <label className="block text-lg font-semibold mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">All Categories</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snack">Snack</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

               

                <div>
                  <label className="block text-lg font-semibold mb-2">Portion Size</label>
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

                    {/* Ingredients */}
                <div>
                  <label className="block text-lg font-semibold mb-2">Ingredients</label>
                  <div className="space-y-2">
                    {ingredients?.map((pref) => (
                      <div key={pref} className="flex items-center gap-2">
                        <Checkbox
                          id={pref}
                          checked={filters.ingredients.includes(pref)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                ingredients: [...filters.ingredients, pref],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                ingredients: filters.ingredients.filter(p => p !== pref),
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

                {/* Dietery */}
                <div>
                  <label className="block text-lg font-semibold mb-2">Dietary Preferences</label>
                  <div className="space-y-2">
                    {dietary?.map((pref) => (
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

                {/* cuisine */}
                <div>
                  <label className="block text-lg font-semibold mb-2">Ingredients</label>
                  <div className="space-y-2">
                    {cuisine?.map((pref) => (
                      <div key={pref} className="flex items-center gap-2">
                        <Checkbox
                          id={pref}
                          checked={filters.cuisine.includes(pref)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilters({
                                ...filters,
                                cuisine: [...filters.cuisine, pref],
                              });
                            } else {
                              setFilters({
                                ...filters,
                                cuisine: filters.cuisine.filter(p => p !== pref),
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

                {/* Price */}

                <div>
                  <label className="block text-lg font-semibold mb-2">Price Range</label>
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
                    <span>৳{filters.minPrice}</span>
                    <span>৳{filters.maxPrice}</span>
                  </div>
                </div>

                   {/* Rating */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Rating</h2>
        <RadioGroup className="space-y-3">
          {[5, 4, 3, 2, 1,0]?.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleRatingFilter(rating)}
                
                value={`${rating}`}
                id={`rating-${rating}`}
                checked = {filters.rating === rating}
              />
              <Label htmlFor={`rating-${rating}`} className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    size={18}
                    key={i}
                    fill={i < rating ? "orange" : "lightgray"}
                    stroke={i < rating ? "orange" : "lightgray"}
                  />
                ))}
              </Label>
            </div>
          ))}
        </RadioGroup>
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
                  className="w-full cursor-pointer hover:bg-gray-200"
                  onClick={() => setFilters({
                    name: [] as string[],
                    providerName: [] as string[],
                    category: '',
                    minPrice: 0,
                    maxPrice: 1000,
                    portionSize: '',
                    dietaryPreferences: [],
                    availableOnly: false,
                    ingredients:[] as string[],
                    cuisine:[] as string[],
                    rating: null as number | null ,
                 
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
              {filteredMeals?.map((meal) => (
                <Card key={meal._id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle>{meal.name}</CardTitle>
                    {/* <p className="text-sm text-gray-500">{meal.mealProvider}</p> */}
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-48 mb-4">
                      <Image
                        src={meal?.imageUrls[0]}
                        width={400}
                        height={400}
                        alt={meal?.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className='flex items-center gap-2 my-2'>
                    <Avatar className="h-8 w-8 border-2 border-green-500">
                <AvatarImage 
                 src={
                  Array.isArray(meal?.mealProvider?.userId?.profileImage)
                    ? meal?.mealProvider?.userId?.profileImage[0] 
                    : meal?.mealProvider?.userId?.profileImage || "https://github.com/shadcn.png"
                }/>
                
                </Avatar>
                <span>{meal?.mealProvider?.userId?.name}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{meal?.description.slice(0,20)}...</p>
                  <div className='flex justify-between'>
                  <p className="font-bold">{currencyFormatter(Number(meal?.price))}</p>
                  <div className='flex items-center gap-2'>
                  <Star
                    size={18}
                    fill={meal.rating === 0 ? 'lightgray' : 'orange' } 
                    stroke={meal.rating === 0 ? 'lightgray' : 'orange' } 
                  /> <p>{meal.rating}</p>
                  </div>
                  </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {meal?.dietaryPreferences?.map((pref) => (
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
                    <Link href={`/mealdetails/${meal._id}`}>
                    <Button  className='cursor-pointer'  disabled={!meal.available}>
                      Menu Details
                    </Button>
                    </Link>
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