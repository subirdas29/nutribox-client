



import DeliveredOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/DeliveredOrders"

import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async() => {

    const {data} = await getAllMealProviderOrder()
   
  return (
    <div>
      <DeliveredOrdersOfMealProvider orders={data}/>
    </div>
  )
}

export default AllOrdersPage
