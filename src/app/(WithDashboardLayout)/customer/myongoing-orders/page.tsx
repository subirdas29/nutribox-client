
import OngoingOrdersOfCustomer from "@/components/modules/Customer/OrderMeal/OngoingOrdersCustomers"

import { getMyOrder } from "@/services/User"


const MyOrderPage = async() => {
    const {data} = await getMyOrder()


   
  return (
    <div>
      <OngoingOrdersOfCustomer myorders = {data}/>
    </div>
  )
}

export default MyOrderPage
