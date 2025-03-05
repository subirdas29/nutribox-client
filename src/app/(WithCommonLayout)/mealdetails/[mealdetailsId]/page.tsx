import UpdateMealForm from "@/components/modules/dashboard/MealProvider/meal/UpdateMealForm"
import { getSingleMeal } from "@/services/Meals"



const MealDetailPage= async({params}:{params:Promise<{mealId:string}>}) => {
    

    const {mealId} = await params

    console.log(mealId)

    const {data:meal} = await getSingleMeal(mealId)
   
  return (
    <div className="flex justify-center items-center">
      {/* <UpdateMealForm meal={meal}/> */}
    </div>
  )
}

export default MealDetailPage
