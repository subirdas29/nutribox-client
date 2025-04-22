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