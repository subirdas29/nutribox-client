




import PendingOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/PendingOrders"
import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async() => {

    const {data} = await getAllMealProviderOrder()
  
  return (
    <div>
      <PendingOrdersOfMealProvider orders={data}/>
    </div>
  )
}

export default AllOrdersPage
