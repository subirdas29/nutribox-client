



import CancelledOrdersOfMealProvider from "@/components/modules/dashboard/MealProvider/ordersofmealprovider/CancelledOrders"


import { getAllMealProviderOrder } from "@/services/Order"


const AllOrdersPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {

  const {page} = await searchParams
    const {data,meta} = await getAllMealProviderOrder(page, '10')

  return (
    <div>
      <CancelledOrdersOfMealProvider orders={data} meta={meta}/>
    </div>
  )
}

export default AllOrdersPage
