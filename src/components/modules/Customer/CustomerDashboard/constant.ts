import { ReactNode } from "react";

export interface MetricCardProps {
    title: string;
    value: string | number; 
    icon: ReactNode; 
    trend: string; 
  }

 export interface ChartCardProps {
    title: string;
    children: ReactNode; 
  }

export const CHART_COLORS = [
  "oklch(0.45 0.3 150)",
  "oklch(0.55 0.3 150)",
  "oklch(0.65 0.3 150)",
  "oklch(0.75 0.3 150)",
  "oklch(0.85 0.3 150)",
];

export const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
