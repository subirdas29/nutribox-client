

import { AllOrderMealsCustomer } from "@/components/modules/dashboard/Customer/AllOrderMealsContext"
import OngoingOrdersOfCustomer from "@/components/modules/dashboard/Customer/OrderMeal/OngoingOrdersCustomers"

import { getMyOrder } from "@/services/User"


const MyOrderPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
  const {data,meta} = await getMyOrder(page, '10')


   
  return (
    <div>
      <AllOrderMealsCustomer myorders = {data}>
      <OngoingOrdersOfCustomer meta={meta}/>
      </AllOrderMealsCustomer>
    </div>
  )
}

export default MyOrderPage
