


import CancelledOrdersOfCustomer from "@/components/modules/Customer/OrderMeal/CancelledOrdersCustomer"


import { getMyOrder } from "@/services/User"


const MyOrderPage = async() => {
    const {data} = await getMyOrder()


   
  return (
    <div>
      <CancelledOrdersOfCustomer myorders = {data}/>
    </div>
  )
}

export default MyOrderPage
