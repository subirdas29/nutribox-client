import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ChartCard } from '@/components/ui/core/DynamicDashboard/ChartCard';
import { DynamicCard } from '@/components/ui/core/DynamicDashboard/DynamicCard';
import { CHART_COLORS } from '@/constant/chartcolor';
import { months } from '@/constant/month';
import { IFlatOrder } from '@/types/order';
import { Plus, ShoppingCart, Utensils, Wallet } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';



export const StatisticsProvider = ({allOrders}:{allOrders:IFlatOrder[]}) => {

console.log(allOrders,'melalafj')
    
      const allOrder = allOrders?.length
    
      const total = allOrders.reduce((sum, item) => sum + item.totalPrice, 0);
    
      const categoryCounts = allOrders.reduce((acc: Record<string, number>, order) => {
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
      allOrders.forEach(order => {
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
    
      const activeOrderCount = allOrders.filter(
        (order) => order.status === "Pending" || order.status === "In-Progress"
      ).length;

  return (
    <div className="p-6 grid gap-6 md:grid-cols-3 bg-background text-foreground">
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
        <DynamicCard 
          title="Total Orders" 
          value={`${allOrder}`} 
          icon={<ShoppingCart className="h-6 w-6 text-primary" />}
          trend="+12.5% from last month"
        />
        <DynamicCard
          title="Total Revenue" 
          value= {`৳${total}`} 
          icon={<Wallet className="h-6 w-6 text-primary" />}
          trend="+8.2% from last month"
        />
        <DynamicCard 
          title="Active Orders" 
          value={`${activeOrderCount}`} 
          icon={<Utensils className="h-6 w-6 text-primary" />}
          trend="3 new this week"
        />
      </div>

      {/* Data Visualization Section */}
      <div className="md:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meal Status Pie Chart */}
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

        {/* Sales & Revenue Combined Chart */}
        <ChartCard title="Monthly Earn">
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={PAYMENT_HISTORY}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar 
        dataKey="amount" 
        name="Amount Earn" 
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
