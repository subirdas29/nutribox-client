"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { Wallet, Utensils,  ShoppingBag } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface MetricCardProps {
    title: string;
    value: string | number; // Value can be a string or number (e.g., 23,500 or "Premium Plan")
    icon: ReactNode; // For icons or other React components
    trend: string; // Trend is typically a string like "+5%" or "Renews in 5 days"
  }

  interface ChartCardProps {
    title: string;
    children: ReactNode; // Children can be any valid React node (such as charts or graphs)
  }

const PAYMENT_HISTORY = [
  { name: "Jan", amount: 5000 },
  { name: "Feb", amount: 4200 },
  { name: "Mar", amount: 3800 },
  { name: "Apr", amount: 4500 },
  { name: "May", amount: 5200 },
];

const MEAL_PREFERENCE_DATA = [
  { name: "Veg Meals", value: 60 },
  { name: "Non-Veg Meals", value: 40 },
];

const COLORS = ["oklch(0.45 0.3 150)", "oklch(0.60 0.3 150)"];

export default function CustomerDashboard() {
    const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => (
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
      
      const ChartCard = ({ title, children }: ChartCardProps) => (
        <Card className="h-full bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">{children}</CardContent>
        </Card>
      );
  return (
    <div className="p-6 grid gap-6 md:grid-cols-3 bg-background text-foreground">
      {/* Quick Actions */}
      <Card className="md:col-span-3 bg-secondary text-secondary-foreground shadow-lg">
        <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
          <div>
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your meals and payments easily
            </CardDescription>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/customer/myorder">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2 cursor-pointer">
                <Utensils className="h-4 w-4" /> View Orders
              </Button>
            </Link>
            {/* <Link href="/customer/payment-history">
              <Button variant="secondary" className="gap-2 border-2 text-secondary-foreground hover:bg-secondary/80 cursor-pointer">
                <CreditCard className="h-4 w-4" /> Payment History
              </Button>
            </Link> */}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard 
          title="Total Spent" 
          value="৳23,500" 
          icon={<Wallet className="h-6 w-6 text-primary" />} 
          trend="+5% from last month"
        />
        <MetricCard 
          title="Favourite Meals" 
          value="20+ Favourite Meals" 
          icon={<Utensils className="h-6 w-6 text-primary" />} 
          trend="Everybody orders that meals"
        />
        <MetricCard 
          title="Total Orders" 
          value="45" 
          icon={<ShoppingBag className="h-6 w-6 text-primary" />} 
          trend="+8% this month"
        />
      </div>

      {/* Data Visualization */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Preference Pie Chart */}
        <ChartCard title="Meal Preference">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={MEAL_PREFERENCE_DATA}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {MEAL_PREFERENCE_DATA.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Payment History Bar Chart */}
        <ChartCard title="Monthly Spending">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={PAYMENT_HISTORY}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="amount" 
                name="Amount Spent" 
                fill="var(--primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}


