

import { OrderRolePageDetails } from "@/components/modules/Order/OrderDetailsPage"
import { getSingleOrder } from "@/services/Order"



const MealDetailPage= async({params}:{params:Promise<{orderdetailsId:string}>}) => {
    

    const {orderdetailsId} = await params

   
    const {data} = await getSingleOrder(orderdetailsId)
     
 
   
  return (
    <div>
      <OrderRolePageDetails order={data}/>
    </div>
  )
}

export default MealDetailPage
