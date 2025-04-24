
import { AllOrderMealsCustomer } from "@/components/modules/dashboard/Customer/AllOrderMealsContext";
import CustomerDashboard from "@/components/modules/dashboard/Customer/CustomerDashboard";
import { getMyOrder } from "@/services/User";

export default async function CustomerDashboardPage() {
  
      const {data} = await getMyOrder()
  
    return (
      <div>
        <AllOrderMealsCustomer myorders = {data}>
          <CustomerDashboard/>
        </AllOrderMealsCustomer>
      </div>
    );
  }