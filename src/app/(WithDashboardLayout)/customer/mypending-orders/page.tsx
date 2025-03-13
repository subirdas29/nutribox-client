
import PendingOrdersOfCustomer from "@/components/modules/Customer/OrderMeal/PendingOrdersCustomer"
import { getMyOrder } from "@/services/User"


const MyOrderPage = async() => {
    const {data} = await getMyOrder()

  
   
  return (
    <div>
      <PendingOrdersOfCustomer myorders = {data}/>
    </div>
  )
}

export default MyOrderPage
