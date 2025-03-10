import { HeroBanner } from "@/components/modules/home/Banner/banner"
import BenefitsGrid from "@/components/modules/home/BenefitsForCustomers"
import HowItWorks from "@/components/modules/home/HowItWorks"
import { MenuCards } from "@/components/modules/home/Menucard/menucard"
import { Navbar } from "@/components/shared/Navbar"
import MealPicker from "@/components/modules/home/PickYourMeal"
import BenefitsForProvider from "@/components/modules/home/ProviderSections/BenefitsForProvider"
import ProviderWorks from "@/components/modules/home/ProviderSections/HowItWorksForProviders"
import CTASection from "@/components/modules/home/ProviderSections/CTASection"
import HowItWorksProvider from "@/components/modules/home/ProviderSections/HowItWorksForProviders"
import FeaturesSectionProvider from "@/components/modules/home/ProviderSections/FeatureSectionPovider"
import { HeroBannerProvider } from "@/components/modules/home/ProviderSections/BannerofProvider"
import MealProviderBusinessTransform from "@/components/modules/home/ProviderSections/TransformBusinessofProvider"
import CustomerTransform from "@/components/modules/home/TransformofCustomers"
import MealProviderStats from "@/components/modules/home/ProviderSections/MealProviderState"







const CommonLayout = () => {
  return (
    <>  
   <Navbar/>
   {/* <Navbar/> */}
   <HeroBanner/>
   <MealProviderStats/>
   <CustomerTransform/>
   <HeroBannerProvider/>
   <MealProviderBusinessTransform/>
   <FeaturesSectionProvider/>

   <HowItWorksProvider/>

   <BenefitsForProvider/>
   <CTASection/>
   <MenuCards/>
    <MealPicker/>
    <BenefitsGrid/>
    <HowItWorks/>
    
    </>
  )
}

export default CommonLayout
