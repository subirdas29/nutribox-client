
import AllOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/AllOrders"

import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async() => {

    const {data} = await getAllMealProviderOrder()
    console.log(data,"allmealorder")
  return (
    <div>
      <AllOrdersOfMealProvider orders={data}/>
    </div>
  )
}

export default AllOrdersPage
