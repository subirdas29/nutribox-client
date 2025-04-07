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
import { Wallet, Utensils,  ShoppingBag, Eye } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { TOrderAllData } from "../OrderMeal/CancelledOrdersCustomer";
import { NBTable } from "@/components/ui/core/NBTable";

import { currencyFormatter } from "@/lib/currencyFormatter";
import dayjs from "dayjs";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

interface MetricCardProps {
    title: string;
    value: string | number; 
    icon: ReactNode; 
    trend: string; 
  }

  interface ChartCardProps {
    title: string;
    children: ReactNode; 
  }




const CHART_COLORS = [
  "oklch(0.45 0.3 150)",
  "oklch(0.55 0.3 150)",
  "oklch(0.65 0.3 150)",
  "oklch(0.75 0.3 150)",
  "oklch(0.85 0.3 150)",
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function CustomerDashboard({myorders}:{myorders:TOrderAllData[]}) {


  const router = useRouter();
  const totalOrders = myorders.length

  const total = myorders.reduce((sum, item) => sum + item.totalPrice, 0);


  const categoryCounts = myorders.reduce((acc: Record<string, number>, order) => {
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
  myorders.forEach(order => {
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

  
const uniqueMealsSet = new Set<string>();

myorders.forEach(order => {
  if (order.mealId && order.mealId._id) {
    uniqueMealsSet.add(order.mealId._id); 
  }
});


const uniqueMealsCount = uniqueMealsSet.size;



      const columns: ColumnDef<TOrderAllData>[] = [
        {
       accessorKey: "imageUrls",
       header: "Image",
       cell: ({ row }) => {
         const profileImage = row.original?.mealId?.imageUrls?.[0] 
           || "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp";
     
         return (
           <Image
             src={profileImage}
             alt={row.original?.customerId?.name || "User"}
             width={50}
             height={50}
             className="w-12 h-12 rounded object-cover"
           />
         );
       },
     },
         {
           accessorKey: "mealname",
           header: "Meal Name",
           cell: ({ row }) => 
             <span className="font-medium">{row.original?.mealName}</span>
          
         },
      
         {
           accessorKey: "category",
           header: "Category",
           cell: ({ row }) => 
           <span>{row.original.category}</span>,
         },
         {
              accessorKey: "deliveryDate", // Ensure the key matches your data
              header: "Delivery Date",
              cell: ({ row }) => (
                <span>
                  {row.original.deliveryDate
                    ? dayjs(row.original.deliveryDate).format("DD-MM-YYYY")
                    : "N/A"}
                </span>
              ),
            },
         {
           accessorKey: "status",
           header: "Status",
           cell: ({ row }) => {
             // Get the status value from the row
             const status = row.original.status ?? "unknown";
         
             
             const getStatusColor = (status: string) => {
               switch (status) {
                 case "pending":
                   return "bg-amber-500 p-2 text-gray-100 rounded-md";  
                 case "in-progress":
                   return "bg-blue-500 p-2 text-gray-100 rounded-md";  
                 case "delivered":
                   return "bg-green-500 p-2 text-gray-100 rounded-md";  
                   case "cancelled":
                   return "bg-red-500 p-2 text-gray-100 rounded-md";
                 default:
                   return "bg-gray-500 p-2 text-gray-100 rounded-md";  
               }
             };
         
             return (
               <span className={`font-bold ${getStatusColor(status)}`}>
                 {status}
               </span>
             );
           },
         },
         
         {
           accessorKey: "price",
           header: "Price (BDT)",
           cell: ({ row }) => <span>{currencyFormatter(parseFloat(row.original.totalPrice.toFixed(2)))}</span>,
         },
         
         {
           accessorKey: "actions",
           header: "Actions",
           cell: ({ row }) => (
             
             <div className="flex space-x-3 ">
               <button className="text-green-500 cursor-pointer" title="View Details"
               onClick={() =>
                 router.push(
                   `/orderdetails/${row.original._id}`
                 )
               }
               >
                 <Eye className="w-5 h-5" />
               </button>

             </div>
           ),
         },
       ];


  return (
  <div>
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
        <MetricCard 
          title="Total Spent" 
          value={`৳${total}`} 
          icon={<Wallet className="h-6 w-6 text-primary" />} 
          trend="+5% from last month"
        />
        <MetricCard 
  title="Favourite Meals" 
  value={`${uniqueMealsCount} Favourite Meals`} 
  icon={<Utensils className="h-6 w-6 text-primary" />} 
  trend="Everybody orders that meals"
/>

        <MetricCard 
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
    <div className="overflow-x-auto p-6">
      <h1 className="text-center text-2xl font-bold mt-10 mb-4">All Orders</h1>
      <NBTable columns={columns} data={Array.isArray(myorders) ? myorders.slice(0, 6) : []} />
        <div className="flex justify-center mt-4">
        <Link href="/customer/mypending-orders">
        <Button>All Orders</Button>
        </Link>
        </div>
            </div>
  </div>
  );
}


