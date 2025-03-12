import MyOrderMeals from "@/components/modules/Customer/OrderMeal/MyOrderMeals"
import { getMyOrder } from "@/services/User"


const MyOrderPage = async() => {
    const {data} = await getMyOrder()

    console.log(data,"all-order manage")
   
  return (
    <div>
      <MyOrderMeals myorder = {data}/>
    </div>
  )
}

export default MyOrderPage
