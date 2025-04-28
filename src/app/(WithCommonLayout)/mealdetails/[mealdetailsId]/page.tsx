
import RecipePage from "@/components/modules/MealDetails/RecipePage"
import { getAllMeals, getSingleMeal } from "@/services/Meals"
import { TMealsForm } from "@/types/meals"

export const generateStaticParams = async()=>{
  
  const {data} = await getAllMeals()
  
  return data.slice(0,6).map((meal:TMealsForm)=>({
    mealdetailsId:meal._id
  }))
}



const MealDetailPage= async({params}:{params:Promise<{mealdetailsId:string}>}) => {
    const {mealdetailsId} = await params
    const {data:meal} = await getSingleMeal(mealdetailsId)

   
  return (
    <div className="flex justify-center items-center">
      <RecipePage meal={meal}/>
    </div>
  )
}

export default MealDetailPage
