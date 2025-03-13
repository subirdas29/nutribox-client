import MealProviderProfile from "@/components/modules/dashboard/MealProvider/profile"
import { getMealProvider } from "@/services/MealProvider"


const ProviderProfilePage = async() => {
     const mealProviderDetails = await getMealProvider()


  return (
    <div>
      <MealProviderProfile mealProviderDetails={mealProviderDetails.data}/>
    </div>
  )
}

export default ProviderProfilePage
