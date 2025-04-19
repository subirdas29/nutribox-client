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
import { Plus, Utensils, ShoppingCart, Wallet, Eye } from "lucide-react";
import Link from "next/link";
import { IMealOrder } from "@/types/order";
import { currencyFormatter } from "@/lib/currencyFormatter";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { NBTable } from "@/components/ui/core/NBTable";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const CHART_COLORS = [
  "oklch(0.45 0.3 150)",
  "oklch(0.55 0.3 150)",
  "oklch(0.65 0.3 150)",
  "oklch(0.75 0.3 150)",
  "oklch(0.85 0.3 150)",
];


export default function MealProviderDashboard({allOrders}:{allOrders:IMealOrder[]}) {
  console.log(allOrders,'off')
    const router = useRouter();

  const allOrder = allOrders?.length
  
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
  
  const columns: ColumnDef<IMealOrder>[] = [
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
          value={`${allOrder}`} 
          icon={<ShoppingCart className="h-6 w-6 text-primary" />}
          trend="+12.5% from last month"
        />
        <MetricCard 
          title="Total Revenue" 
          value= {`৳${total}`} 
          icon={<Wallet className="h-6 w-6 text-primary" />}
          trend="+8.2% from last month"
        />
        <MetricCard 
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
    <div className="overflow-x-auto p-6">
<h1 className="text-center text-2xl font-bold mt-10 mb-4">All Meals</h1>
<NBTable columns={columns} data={Array.isArray(allOrders) ? allOrders.slice(0, 6) : []} />
  <div className="flex justify-center mt-4">
  <Link href="/mealprovider/meals/allmeals">
  <Button>All Meals</Button>
  </Link>
  </div>
      </div>
 </div>


  );
}
