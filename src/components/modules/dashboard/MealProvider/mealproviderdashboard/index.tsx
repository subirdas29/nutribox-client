"use client";

import { Button } from "@/components/ui/button";

import { Eye } from "lucide-react";
import Link from "next/link";
import { IFlatOrder} from "@/types/order";
import { currencyFormatter } from "@/lib/currencyFormatter";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { NBTable } from "@/components/ui/core/NBTable";

import { StatisticsProvider } from "./statistics";
import { IOrderCartMeal } from "@/types/cart";



export default function MealProviderDashboard({allOrders}:{allOrders:IOrderCartMeal[]}) {
  console.log(allOrders,'off')
    const router = useRouter();
    const allOrderMeals = allOrders.flatMap((order)=>
      order.selectedMeals.map((meal)=>({
        ...meal,
        orderId: order._id,
        deliveryDate: order.deliveryDate,
        deliveryAddress: order.deliveryAddress,
        totalPrice: meal.orderPrice,
        transaction: order.transaction,
        createdAt:order.createdAt
      }))
    )
  
  const columns: ColumnDef<IFlatOrder>[] = [
    {
   accessorKey: "imageUrls",
   header: "Image",
   cell: ({ row }) => {
    const meal = row.original.mealId
     const profileImage = typeof meal==='object' && meal?.imageUrls?.[0] ? meal?.imageUrls[0]:"https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp";
 
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

      {/* Quick Actions Section */}
   <StatisticsProvider allOrders={allOrderMeals} />
   
   

    <div className="overflow-x-auto p-6">
<h1 className="text-center text-2xl font-bold mt-10 mb-4">All Meals</h1>
<NBTable columns={columns} data={Array.isArray(allOrderMeals) ? allOrderMeals.slice(0, 6) : []} />
  <div className="flex justify-center mt-4">
  <Link href="/mealprovider/meals/allmeals">
  <Button>All Meals</Button>
  </Link>
  </div>
      </div>
 </div>


  );
}
