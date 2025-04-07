




import PendingOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/PendingOrders"
import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
    const {data,meta} = await getAllMealProviderOrder(page, '10')
  
  return (
    <div>
      <PendingOrdersOfMealProvider orders={data} meta={meta}/>
    </div>
  )
}

export default AllOrdersPage
