

import { OrderRolePageDetails } from "@/components/modules/Order/OrderDetailsPage"
import { getSingleMealOrder } from "@/services/Order"



const MealDetailPage= async({params}:{params:Promise<{orderdetailsId:string,mealdetailsId:string}>}) => {
    const {orderdetailsId,mealdetailsId} = await params
    const {data} = await getSingleMealOrder(orderdetailsId,mealdetailsId)
 
   
  return (
    <div>
      <OrderRolePageDetails orders={data}/>
    </div>
  
)
}

export default MealDetailPage
