import AllMeals from "@/components/modules/dashboard/MealProvider/meal/AllMeals"
import { getAllMeals } from "@/services/Meals"


const AllMealsPage = async() => {
    const {data} = await getAllMeals()
    console.log(data,"allserver,meals")
  return (
    <div>
      <AllMeals meals={data}/>
    </div>
  )
}

export default AllMealsPage
