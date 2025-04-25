
import { AllOrderMealsCustomer } from "@/components/modules/dashboard/Customer/AllOrderMealsContext"
import PendingOrdersOfCustomer from "@/components/modules/dashboard/Customer/OrderMeal/PendingOrdersCustomer"
import { getMyOrder } from "@/services/User"

const MyOrderPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
  const {data,meta} = await getMyOrder(page, '10')

  
   
  return (
    <div>
        <AllOrderMealsCustomer myorders = {data}>
            <PendingOrdersOfCustomer meta={meta}/>
        </AllOrderMealsCustomer>
 
    </div>
  )
}

export default MyOrderPage
