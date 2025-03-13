



import OnGoingOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/OngoingOrders"
import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async() => {

    const {data} = await getAllMealProviderOrder()
 
  return (
    <div>
      <OnGoingOrdersOfMealProvider orders={data}/>
    </div>
  )
}

export default AllOrdersPage
