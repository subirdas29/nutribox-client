


import CancelledOrdersOfCustomer from "@/components/modules/Customer/OrderMeal/CancelledOrdersCustomer"


import { getMyOrder } from "@/services/User"


const MyOrderPage = async({searchParams}:{searchParams:Promise<{page:string}>}) => {
  const {page} = await searchParams
    const {data,meta} = await getMyOrder(page, '10')


   
  return (
    <div>
      <CancelledOrdersOfCustomer myorders = {data} meta={meta}/>
    </div>
  )
}

export default MyOrderPage
