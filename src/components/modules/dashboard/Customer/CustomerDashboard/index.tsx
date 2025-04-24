"use client";

import { Button } from "@/components/ui/button";

import {  Eye } from "lucide-react";
import Link from "next/link";



import { NBTable } from "@/components/ui/core/NBTable";

import { currencyFormatter } from "@/lib/currencyFormatter";
import dayjs from "dayjs";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";


import StatisticsCustomer from "./statistics";
import { IFlatOrder } from "@/types/order";

import { useAllOrderMeals } from "../AllOrderMealsContext";
import { useStatusColor } from "@/hooks/StatusColor";



export default function CustomerDashboard() {


const allOrderMeals = useAllOrderMeals()

const {getStatusColor} = useStatusColor()
console.log(allOrderMeals,'context data')

  const router = useRouter();

      const columns: ColumnDef<IFlatOrder>[] = [
        {
       accessorKey: "imageUrls",
       header: "Image",
       cell: ({ row }) => {
        const meal = row.original?.mealId
         const profileImage = typeof meal ==="object" && meal?.imageUrls?.[0]?
         meal?.imageUrls[0]: "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp";
     
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
           accessorKey: "quantity",
           header: "Order Quantity",
           cell: ({ row }) => 
           <span>{row.original.quantity}</span>,
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
           cell: ({ row }) => 
          {
           
            const orderId = row.original.orderId
            const mealId = typeof row.original.mealId=== 'string' ? row.original.mealId : row.original.mealId._id 
             return (
              <div className="flex space-x-3 ">
                <button className="text-green-500 cursor-pointer" title="View Details"
                onClick={() =>
                 
                  router.push(
                    `/orderdetails/${orderId}/meal/${mealId}`)
                }
                >
                  <Eye className="w-5 h-5" />
                </button>
 
              </div>
            )
          }
         },
       ];


  return (
  <div>
     <StatisticsCustomer myOrders={allOrderMeals}/>
    <div className="overflow-x-auto p-6">
      <h1 className="text-center text-2xl font-bold mt-10 mb-4">All Orders</h1>
      <NBTable columns={columns} data={Array.isArray(allOrderMeals) ? allOrderMeals.slice(0, 6) : []} />
        <div className="flex justify-center mt-4">
        <Link href="/customer/mypending-orders">
        <Button>All Orders</Button>
        </Link>
        </div>
            </div>
  </div>
  );
}


