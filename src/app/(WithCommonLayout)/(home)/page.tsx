import { HeroBanner } from "@/components/modules/home/Banner/banner"
import BenefitsGrid from "@/components/modules/home/BenefitsForCustomers"
import HowItWorks from "@/components/modules/home/HowItWorks"
import { MenuCards } from "@/components/modules/home/Menucard/menucard"
import { Navbar } from "@/components/shared/Navbar"
import MealPicker from "@/components/modules/home/PickYourMeal"







const CommonLayout = () => {
  return (
    <>  
   <Navbar/>
   {/* <Navbar/> */}
   <HeroBanner/>
   <MenuCards/>
    <MealPicker/>
    <BenefitsGrid/>
    <HowItWorks/>
    
    </>
  )
}

export default CommonLayout
