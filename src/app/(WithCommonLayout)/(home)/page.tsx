"use client";
import { useUser } from "@/context/UserContext";

import { HeroBanner } from "@/components/modules/home/Banner/banner";
import BenefitsGrid from "@/components/modules/home/BenefitsForCustomers";
import HowItWorks from "@/components/modules/home/HowItWorks";
import { MenuCards } from "@/components/modules/home/Menucard/menucard";
import MealPicker from "@/components/modules/home/PickYourMeal";
import CustomerTransform from "@/components/modules/home/TransformofCustomers";

// Meal Provider Sections
import { HeroBannerProvider } from "@/components/modules/home/ProviderSections/BannerofProvider";
import MealProviderStats from "@/components/modules/home/ProviderSections/MealProviderState";
import MealProviderBusinessTransform from "@/components/modules/home/ProviderSections/TransformBusinessofProvider";
import FeaturesSectionProvider from "@/components/modules/home/ProviderSections/FeatureSectionPovider";
import HowItWorksProvider from "@/components/modules/home/ProviderSections/HowItWorksForProviders";
import BenefitsForProvider from "@/components/modules/home/ProviderSections/BenefitsForProvider";
import CTASection from "@/components/modules/home/ProviderSections/CTASection";
import MeetOurCreators from "@/components/modules/home/OurCreators";

const CommonLayout = () => {
  const { user } = useUser(); // Get user details

  return (
    <>
     
      
      {/* If user is NOT logged in or is a customer, show Customer Sections */}
      {!user || user.role === "customer" ? (
        <>
          <HeroBanner />
          
          <MenuCards />
          <CustomerTransform />
          <MealPicker />
          <BenefitsGrid />
          <HowItWorks />
          <MeetOurCreators/>
        </>
      ) : (
        /* If user is a Meal Provider, show Provider Sections */
        <>
          <HeroBannerProvider />
          <MealProviderStats />
          <MenuCards />
          <MealProviderBusinessTransform />
          <FeaturesSectionProvider />
          <HowItWorksProvider />
          <BenefitsForProvider />
        </>
      )}

      {/* Show CTASection for everyone */}
      <CTASection />
    </>
  );
};

export default CommonLayout;
