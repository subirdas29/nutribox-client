"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,

  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Plus, Utensils, ShoppingCart, Wallet } from "lucide-react";
import Link from "next/link";

const SALES_DATA = [
  { name: "Jan", orders: 400, revenue: 2400 },
  { name: "Feb", orders: 300, revenue: 2210 },
  { name: "Mar", orders: 200, revenue: 2290 },
  { name: "Apr", orders: 278, revenue: 2000 },
  { name: "May", orders: 189, revenue: 2181 },
];

const MEAL_STATUS_DATA = [
  { name: "Active Meals", value: 56 },
  { name: "Inactive Meals", value: 44 },
];

const COLORS = ["oklch(0.45 0.3 150)", "oklch(0.60 0.3 150)"]; // Using colors from Tailwind config

export default function MealProviderDashboard() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-3 bg-background text-foreground">
      {/* Quick Actions Section */}
      <Card className="md:col-span-3 bg-secondary text-secondary-foreground shadow-lg">
        <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
          <div className="mb-4 md:mb-0">
            <CardTitle className="text-2xl">Quick Actions</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your meal service efficiently
            </CardDescription>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
           <Link href='/mealprovider/meals/post-meal-menu'>
           <Button className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2 cursor-pointer">
              <Plus className="h-4 w-4" />
              Add New Meal
            </Button>
           </Link>
           <Link href='/mealprovider/meals/allmeals'>
           <Button variant="secondary" className="gap-2 border-2 text-secondary-foreground hover:bg-secondary/80 cursor-pointer">
              <Utensils className="h-4 w-4" />
              Manage Menu
            </Button>
           </Link>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Orders" 
          value="1,234" 
          icon={<ShoppingCart className="h-6 w-6 text-primary" />}
          trend="+12.5% from last month"
        />
        <MetricCard 
          title="Total Revenue" 
          value="৳1,23,400" 
          icon={<Wallet className="h-6 w-6 text-primary" />}
          trend="+8.2% from last month"
        />
        <MetricCard 
          title="Active Meals" 
          value="56" 
          icon={<Utensils className="h-6 w-6 text-primary" />}
          trend="3 new this week"
        />
      </div>

      {/* Data Visualization Section */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Status Pie Chart */}
        <ChartCard title="Meal Status Distribution">
        <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={MEAL_STATUS_DATA}
      dataKey="value"
      nameKey="name"
      outerRadius={100}  // Reduce radius for better spacing
      label={({ name, value }) => `${name}: ${value}`} // Show exact numbers
      labelLine={false} // Remove lines if needed
    >
      {MEAL_STATUS_DATA.map((_, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>

        </ChartCard>

        {/* Sales & Revenue Combined Chart */}
        <ChartCard title="Sales Performance">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={SALES_DATA}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="orders" 
                name="Monthly Orders"
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue"
                stroke="var(--ring)" 
                strokeWidth={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

// Metric Card Component
const MetricCard = ({ title, value, icon, trend }: { 
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

// Chart Card Component
const ChartCard = ({ title, children }: { 
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
