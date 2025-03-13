import CustomerProfile from "@/components/modules/Customer/Profile"


import { getMe } from "@/services/User"


const ProviderProfilePage = async() => {
     const customerDetails = await getMe()


  return (
    <div>
      <CustomerProfile customerDetails={customerDetails.data}/>
    </div>
  )
}

export default ProviderProfilePage
