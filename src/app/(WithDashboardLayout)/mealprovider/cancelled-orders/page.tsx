



import CancelledOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/CancelledOrders"


import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async() => {

    const {data} = await getAllMealProviderOrder()
   
  return (
    <div>
      <CancelledOrdersOfMealProvider orders={data}/>
    </div>
  )
}

export default AllOrdersPage
