



import OrderPageDetails from "@/components/modules/Order/OrderDetails"
import { getSingleOrder } from "@/services/Order"



const MealDetailPage= async({params}:{params:Promise<{orderdetailsId:string}>}) => {
    

    const {orderdetailsId} = await params

   
    const {data:orderdetails} = await getSingleOrder(orderdetailsId)
     
    
   
  return (
    <div className="flex justify-center items-center">
      <OrderPageDetails orderdetails={orderdetails}/>
    </div>
  )
}

export default MealDetailPage
