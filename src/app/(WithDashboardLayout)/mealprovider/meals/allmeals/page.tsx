import AllMeals from "@/components/modules/dashboard/MealProvider/meal/AllMeals"
import {  getAllProviderMeals } from "@/services/Meals"


const AllMealsPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
    const {data,meta} = await getAllProviderMeals(page, '10')

  return (
    <div>
      <AllMeals meals={data} meta={meta}/>
    </div>
  )
}

export default AllMealsPage
