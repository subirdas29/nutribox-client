

import { OrderRolePageDetails } from "@/components/modules/Order/OrderDetailsPage"
import { getSingleOrder } from "@/services/Order"



const MealDetailPage= async({params}:{params:Promise<{orderdetailsId:string}>}) => {
    

    const {orderdetailsId} = await params

   console.log(orderdetailsId,'id')
    const {data} = await getSingleOrder(orderdetailsId)
     
    console.log(data,'orderdata')
   
  return (
    <div className="flex justify-center items-center">
      <OrderRolePageDetails order={data}/>
    </div>
  )
}

export default MealDetailPage
