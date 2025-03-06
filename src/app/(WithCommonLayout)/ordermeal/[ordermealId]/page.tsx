


import OrderPage from "@/components/modules/Order/orderpage"
import { getSingleMeal } from "@/services/Meals"



const OrderMealPage= async({params}:{params:Promise<{ordermealId:string}>}) => {
    

    const {ordermealId} = await params

   
    const {data:ordermeal} = await getSingleMeal(ordermealId)

   
  return (
    <div className="flex justify-center items-center">
      <OrderPage ordermeal={ordermeal}/>
    </div>
  )
}

export default OrderMealPage
