import CustomerProfile from "@/components/modules/Customer/Profile"


import { getMe } from "@/services/User"


const ProviderProfilePage = async() => {
     const customerDetails = await getMe()

     console.log(customerDetails.data)
  return (
    <div>
      <CustomerProfile customerDetails={customerDetails.data}/>
    </div>
  )
}

export default ProviderProfilePage
