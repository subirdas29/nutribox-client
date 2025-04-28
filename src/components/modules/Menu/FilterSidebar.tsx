/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { RadioGroup } from "@/components/ui/radio-group"
import { getAllMeals } from "@/services/Meals"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const FilterSidebar = () => {

    const [meals, setMeals] = useState([])
    const [isLoading,setIsLoading] = useState(false)

    const [category,setCategory] = useState([])

    useEffect(()=>{
        const filterData = async() =>{
            setIsLoading(true)
            try{
                const {data:allMealsData} = await getAllMeals()
                setMeals(allMealsData)
            }
            catch(error:any){
                console.error(error)
                toast.error("Failed to fetch filters");
            }finally{
                setIsLoading(false)
            }
        }
        filterData()
    },[])
    console.log(meals)

    const mealName = meals?.map(meal=>meal?.)

  return (
    <div>
           <div>
                  <label className="block text-lg font-semibold mb-2 ">Meal Name</label>
                  {
                    !isLoading && (
                        <RadioGroup className="space-y-2">
                    {
                        meals.map((meal)=>(
                            <div>

                            </div>
                        ))
                    }
                  </RadioGroup>
                    )
                  }
    </div>
    </div>
  )
}

export default FilterSidebar
