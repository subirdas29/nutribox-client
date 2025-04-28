"use client";

import { Button } from "@/components/ui/button";

import { Eye } from "lucide-react";
import Link from "next/link";

import { currencyFormatter } from "@/lib/currencyFormatter";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { NBTable } from "@/components/ui/core/NBTable";

import { StatisticsProvider } from "./statistics";

import { useStatusColor } from "@/hooks/StatusColor";
import { IOrderCartMeal, } from "@/types/cart";




export default function MealProviderDashboard({allOrders}:{allOrders:IOrderCartMeal[]}) {

  console.log(allOrders)
    const router = useRouter();

    const {getStatusColor} = useStatusColor()

  
  const columns: ColumnDef<IOrderCartMeal>[] = [
    {
   accessorKey: "imageUrls",
   header: "Image",
   cell: ({ row }) => {
    const meal = row.original.selectedMeals[0].mealId
     const profileImage = typeof meal==='object' && meal?.imageUrls ? meal?.imageUrls[0]:"https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp";
 
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
  accessorKey: "orderId",
  header: "Order Id",
  cell: ({ row }) => 
    <span className="font-medium">{row.original?.selectedMeals[0]._id}</span>
 
},
     {
       accessorKey: "mealname",
       header: "Meal Name",
       cell: ({ row }) => 
         <span className="font-medium">{row.original?.selectedMeals[0].mealName}</span>
      
     },
  
     {
       accessorKey: "quantity",
       header: "Order Quantity",
       cell: ({ row }) => 
       <span>{row.original.selectedMeals[0].quantity}</span>,
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
         const status = row.original.selectedMeals[0].status ?? "unknown";
     
         
    
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
       cell: ({ row }) => <span>{currencyFormatter(parseFloat(row.original.selectedMeals[0].orderPrice.toFixed(2)))}</span>,
     },
     
     {
       accessorKey: "actions",
       header: "Actions",
       cell: ({ row }) => (
         
         <div className="flex space-x-3 ">
           <button className="text-green-500 cursor-pointer" title="View Details"
           onClick={() =>
            router.push(
              `/orderdetails/${row.original._id}/meal/${row.original.selectedMeals[0]._id}`)
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

      {/* Quick Actions Section */}
   <StatisticsProvider allOrders={allOrders} />
   
   

    <div className="overflow-x-auto p-6">
<h1 className="text-center text-2xl font-bold mt-10 mb-4">All Meals</h1>
<NBTable columns={columns} data={Array.isArray(allOrders) ? allOrders.slice(0, 6) : []} />
  <div className="flex justify-center mt-4 cursor-pointer">
  <Link href="/mealprovider/meals/allmeals">
  <Button>All Meals</Button>
  </Link>
  </div>
      </div>
 </div>


  );
}
