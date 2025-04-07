import MealProviderDashboard from "@/components/modules/dashboard/MealProvider/mealproviderdashboard";
import { getAllMealProviderOrder } from "@/services/Order";

export default async function UserDashboard() {
    const {data} = await getAllMealProviderOrder()
    return (
      <div>
     
        <MealProviderDashboard allOrders = {data}/>
      
      </div>
    );
  }