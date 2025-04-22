import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../card';

// Chart Card Component
export const ChartCard = ({ title, children }: { 
    title: string;
    children: React.ReactNode;
  }) => (
    <Card className="h-full bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px]">{children}</CardContent>
    </Card>
  );