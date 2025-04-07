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
import AnimatedSection from "@/components/ui/core/Animation/animation";

const CommonLayout = () => {
  const { user } = useUser(); // Get user details

  return (
    <>
     
      
     {!user || user.role === "customer" ? (
  <>
    <AnimatedSection><HeroBanner /></AnimatedSection>
    <AnimatedSection delay={0.1}><MenuCards /></AnimatedSection>
    <AnimatedSection delay={0.2}><CustomerTransform /></AnimatedSection>
    <AnimatedSection delay={0.3}><MealPicker /></AnimatedSection>
    <AnimatedSection delay={0.4}><BenefitsGrid /></AnimatedSection>
    <AnimatedSection delay={0.5}><HowItWorks /></AnimatedSection>
    <AnimatedSection delay={0.6}><MeetOurCreators /></AnimatedSection>
  </>
) : (
  <>
    <AnimatedSection><HeroBannerProvider /></AnimatedSection>
    <AnimatedSection delay={0.1}><MealProviderStats /></AnimatedSection>
    <AnimatedSection delay={0.2}><MenuCards /></AnimatedSection>
    <AnimatedSection delay={0.3}><MealProviderBusinessTransform /></AnimatedSection>
    <AnimatedSection delay={0.4}><FeaturesSectionProvider /></AnimatedSection>
    <AnimatedSection delay={0.5}><HowItWorksProvider /></AnimatedSection>
    <AnimatedSection delay={0.6}><BenefitsForProvider /></AnimatedSection>
  </>
)}

<AnimatedSection delay={0.7}><CTASection /></AnimatedSection>
    </>
  );
};

export default CommonLayout;
