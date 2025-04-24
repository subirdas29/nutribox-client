
import { AllOrderMealsCustomer } from "@/components/modules/dashboard/Customer/AllOrderMealsContext"
import PendingOrdersOfCustomer from "@/components/modules/dashboard/Customer/OrderMeal/PendingOrdersCustomer"
import { getMyOrder } from "@/services/User"

interface MyOrderPageProps {
  searchParams: {
    page?: string;
  };
}

const MyOrderPage = async({searchParams}:MyOrderPageProps) => {
  const {page} = searchParams
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
