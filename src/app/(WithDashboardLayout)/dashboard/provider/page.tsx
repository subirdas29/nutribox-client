import AllMeals from "@/components/modules/dashboard/meal-provider";
import { getAllMeals } from "@/services/Meals";



const ProviderDashboard= async()=> {

    const {data} = await getAllMeals()
    console.log(data)
    return (
      <div>
     
     <AllMeals meals= {data}/>
        
      </div>
    );
  }

  export default ProviderDashboard