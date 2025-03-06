
import RecipePage from "@/components/modules/MealDetails/RecipePage"
import { getSingleMeal } from "@/services/Meals"



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
