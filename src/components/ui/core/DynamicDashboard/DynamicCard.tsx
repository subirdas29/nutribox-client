import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

// Metric Card Component
export const DynamicCard = ({ title, value, icon, trend }: { 
    title: string;
    value: string;
    icon: React.ReactNode;
    trend: string;
  }) => (
    <Card className="hover:shadow-lg transition-shadow bg-card text-card-foreground border border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-2">{trend}</p>
      </CardContent>
    </Card>
  );
