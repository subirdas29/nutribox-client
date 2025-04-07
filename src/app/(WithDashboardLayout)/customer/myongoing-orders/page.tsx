
import OngoingOrdersOfCustomer from "@/components/modules/Customer/OrderMeal/OngoingOrdersCustomers"

import { getMyOrder } from "@/services/User"


const MyOrderPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
  const {data,meta} = await getMyOrder(page, '10')


   
  return (
    <div>
      <OngoingOrdersOfCustomer myorders = {data} meta={meta}/>
    </div>
  )
}

export default MyOrderPage
