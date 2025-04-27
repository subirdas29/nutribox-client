import React from 'react'

import { Card, CardContent, CardDescription,  CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Utensils, Wallet } from 'lucide-react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { IFlatOrder } from '@/types/order';
import { DynamicCard } from '@/components/ui/core/DynamicDashboard/DynamicCard';
import { ChartCard } from '@/components/ui/core/DynamicDashboard/ChartCard';

import { months } from '@/constant/month';
import { CHART_COLORS } from '@/constant/chartColor';


const StatisticsCustomer = ({myOrders}:{myOrders:IFlatOrder[]}) => {

      const totalOrders = myOrders.length.toString()
    
      const total = myOrders.reduce((sum, item) => sum + item.totalPrice, 0);
    
    
      const categoryCounts = myOrders.reduce((acc: Record<string, number>, order) => {
        const category = order?.category || "Unknown";
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {}); 
      
      const CATEGORY_DATA = Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value,
      }));
    
      const monthlySpendingMap: Record<string, number> = {};
      months.forEach(month => {
        monthlySpendingMap[month] = 0;
      });
      
      // Step 2: Populate with actual data
      myOrders.forEach(order => {
        if (!order.createdAt) return;
        const monthIndex = new Date(order.createdAt).getMonth(); // 0-11
        const month = months[monthIndex];
        monthlySpendingMap[month] += order.totalPrice;
      });
      
      // Step 3: Convert to chart data
      const PAYMENT_HISTORY = months.map(month => ({
        name: month,
        amount: monthlySpendingMap[month]
      }));
      

      
    const uniqueMealsSet = new Set<string>();

    myOrders.forEach(order => {
        const meal = order.mealId
      if (typeof(meal)=== "string") {
        uniqueMealsSet.add(meal); 
      }
      else if(meal && '_id' in meal){
        uniqueMealsSet.add(meal._id)
      }
    });

    
    const uniqueMealsCount = uniqueMealsSet.size;
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
            <Link href="/customer/mypending-orders">
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
        <DynamicCard 
          title="Total Spent" 
          value={`৳${total}`} 
          icon={<Wallet className="h-6 w-6 text-primary" />} 
          trend="+5% from last month"
        />
        <DynamicCard 
  title="Favourite Meals" 
  value={`${uniqueMealsCount} Favourite Meals`} 
  icon={<Utensils className="h-6 w-6 text-primary" />} 
  trend="Everybody orders that meals"
/>

        <DynamicCard
          title="Total Orders" 
          value={totalOrders} 
          icon={<ShoppingBag className="h-6 w-6 text-primary" />} 
          trend="+8% this month"
        />
      </div>

      {/* Data Visualization */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Preference Pie Chart */}
        <ChartCard title="Order by Meal Category">
  {CATEGORY_DATA.length > 0 ? (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={CATEGORY_DATA}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={false}
        >
          {CATEGORY_DATA.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <div className="h-[300px] flex items-center justify-center text-muted-foreground text-sm">
      No data available to display
    </div>
  )}
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
  )
}

export default StatisticsCustomer
