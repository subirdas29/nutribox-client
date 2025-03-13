import UpdateMealForm from "@/components/modules/dashboard/MealProvider/meal/UpdateMealForm"
import { getSingleMeal } from "@/services/Meals"



const UpdateMealPage = async({params}:{params:Promise<{mealId:string}>}) => {
    

    const {mealId} = await params

   

    const {data:meal} = await getSingleMeal(mealId)
   
  return (
    <div className="flex justify-center items-center">
      <UpdateMealForm meal={meal}/>
    </div>
  )
}

export default UpdateMealPage
