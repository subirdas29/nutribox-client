



import OnGoingOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/OngoingOrders"
import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {

  const {page} = await searchParams
  const {data,meta} = await getAllMealProviderOrder(page, '10')
 
  return (
    <div>
      <OnGoingOrdersOfMealProvider orders={data} meta={meta}/>
    </div>
  )
}

export default AllOrdersPage
