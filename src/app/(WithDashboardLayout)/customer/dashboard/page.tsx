import CustomerDashboard from "@/components/modules/Customer/CustomerDashboard";
import { getMyOrder } from "@/services/User";

export default async function CustomerDashboardPage() {
  
      const {data} = await getMyOrder()
    return (
      <div>
       <CustomerDashboard myorders = {data}/>
      </div>
    );
  }