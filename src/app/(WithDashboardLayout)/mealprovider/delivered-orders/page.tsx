



import DeliveredOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/DeliveredOrders"

import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {

  const {page} = await searchParams
  const {data,meta} = await getAllMealProviderOrder(page, '10')
   
  return (
    <div>
      <DeliveredOrdersOfMealProvider orders={data} meta={meta}/>
    </div>
  )
}

export default AllOrdersPage
