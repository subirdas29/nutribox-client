import { HeroBanner } from "@/components/modules/home/Banner/banner"
import BenefitsGrid from "@/components/modules/home/BenefitsForCustomers"
import HowItWorks from "@/components/modules/home/HowItWorks"
import { MenuCards } from "@/components/modules/home/Menucard/menucard"
import { MainNav } from "@/components/modules/home/Navbar/navbar"
import MealPicker from "@/components/modules/home/PickYourMeal"





const CommonLayout = () => {
  return (
    <>  
   <MainNav/>
   <HeroBanner/>
   <MenuCards/>
    <MealPicker/>
    <BenefitsGrid/>
    <HowItWorks/>
    </>
  )
}

export default CommonLayout
