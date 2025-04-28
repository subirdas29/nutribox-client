/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { getAllMeals } from "@/services/Meals";
import { TMealsForm } from "@/types/meals";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const FilterSidebar = () => {
  const [meals, setMeals] = useState<TMealsForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState([0])
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const filterData = async () => {
      setIsLoading(true);
      try {
        const { data: allMealsData } = await getAllMeals();
        setMeals(allMealsData);
      } catch (error: any) {
        console.error(error);
        toast.error("Failed to fetch filters");
      } finally {
        setIsLoading(false);
      }
    };
    filterData();
  }, []);
  console.log(meals);

  const handleSearchQuery = (query:string,value:string | number)=>{
    const params = new URLSearchParams(searchParams)
    params.set(query,value.toString())
    router.push(`${pathName}?${params.toString()}`,
    {scroll:false}
)
  }

  // const mealCategory = [...new Set(meals?.map(cate =>cate.category))]
  // const cuisine = [...new Set(meals?.flatMap((meal)=>meal.mealProvider.cuisineSpecialties))]

  return (
    <div>
      <div>
        <Label className="block text-lg font-semibold mb-2 ">Meal Name</Label>
        {!isLoading && (
          <RadioGroup className="space-y-2">
            {meals.map((mealName: { _id: string; name: string }) => (
              <div key={mealName._id} className="flex items-center space-x-2">
                <RadioGroupItem
                onClick={()=>handleSearchQuery('meal',mealName._id)}
                  value={mealName._id}
                  id={mealName._id}
                />
                <Label htmlFor={mealName._id}>{mealName.name}</Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </div>
      <div>
        <Label className="block text-lg font-semibold mb-2 ">Price Range</Label>
        <div className="flex items-center justify-between text-sm mb-2">
            <span>0</span>
            <span>50000</span>
        </div>
        <Slider
      
      max={50000}
      step={1}
    onValueChange={(value)=>{
        setPrice(value)
        handleSearchQuery('price',value[0])
    }}
    className="w-full "
    />
    <p className="text-sm mt-2">Selected Price:{price[0]}</p>
      </div>
    </div>
  );
};

export default FilterSidebar;
