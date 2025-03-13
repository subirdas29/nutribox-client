


import DeliveredOrdersOfCustomer from "@/components/modules/Customer/OrderMeal/DeliveredOrdersCustomer"

import { getMyOrder } from "@/services/User"


const MyOrderPage = async() => {
    const {data} = await getMyOrder()


   
  return (
    <div>
      <DeliveredOrdersOfCustomer myorders = {data}/>
    </div>
  )
}

export default MyOrderPage
