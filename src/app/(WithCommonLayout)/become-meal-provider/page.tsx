"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { HeroBannerProvider } from "@/components/modules/home/ProviderSections/BannerofProvider";
import MealProviderStats from "@/components/modules/home/ProviderSections/MealProviderState";
import MealProviderBusinessTransform from "@/components/modules/home/ProviderSections/TransformBusinessofProvider";
import FeaturesSectionProvider from "@/components/modules/home/ProviderSections/FeatureSectionPovider";
import HowItWorksProvider from "@/components/modules/home/ProviderSections/HowItWorksForProviders";
import BenefitsForProvider from "@/components/modules/home/ProviderSections/BenefitsForProvider";
import CTASection from "@/components/modules/home/ProviderSections/CTASection";
import AnimatedSection from "@/components/ui/core/Animation/animation";

export default function BecomeMealProvider() {
  const { user } = useUser();
  const router = useRouter();

  // Redirect meal providers to their dashboard
  useEffect(() => {
    if (user?.role === "mealprovider") {
      router.replace("/meal-provider/dashboard");
    }
  }, [user, router]);

  return (
   <div>
      <AnimatedSection delay={0.1}><HeroBannerProvider /></AnimatedSection>
      <AnimatedSection delay={0.2}><MealProviderStats /></AnimatedSection>
      <AnimatedSection delay={0.3}><MealProviderBusinessTransform /></AnimatedSection>
      <AnimatedSection delay={0.4}><FeaturesSectionProvider /></AnimatedSection>
      <AnimatedSection delay={0.5}><HowItWorksProvider /></AnimatedSection>
      <AnimatedSection delay={0.6}><BenefitsForProvider /></AnimatedSection>
      <AnimatedSection delay={0.7}><CTASection /></AnimatedSection>
   </div>
  );
}
