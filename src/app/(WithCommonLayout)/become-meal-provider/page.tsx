"use client";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HeroBannerProvider } from "@/components/modules/home/ProviderSections/BannerofProvider";
import MealProviderStats from "@/components/modules/home/ProviderSections/MealProviderState";
import MealProviderBusinessTransform from "@/components/modules/home/ProviderSections/TransformBusinessofProvider";
import FeaturesSectionProvider from "@/components/modules/home/ProviderSections/FeatureSectionPovider";
import HowItWorksProvider from "@/components/modules/home/ProviderSections/HowItWorksForProviders";
import BenefitsForProvider from "@/components/modules/home/ProviderSections/BenefitsForProvider";
import CTASection from "@/components/modules/home/ProviderSections/CTASection";

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
     <HeroBannerProvider />
    <MealProviderStats />
    <MealProviderBusinessTransform />
    <FeaturesSectionProvider />
    <HowItWorksProvider />
    <BenefitsForProvider />
    <CTASection />
   </div>
  );
}
