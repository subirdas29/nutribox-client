import AllMeals from "@/components/modules/dashboard/MealProvider/meal/AllMeals"
import { getAllMeals } from "@/services/Meals"


const AllMealsPage = async() => {
    const meals = await getAllMeals()
    
  return (
    <div>
      <AllMeals meals={meals.data}/>
    </div>
  )
}

export default AllMealsPage
