"use client";

import { NBTable } from "@/components/ui/core/NBTable";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NBModal/DeleteConfirmationModal";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/lib/currencyFormatter";

import { IOrder } from "@/types/order";
import { updateOrder } from "@/services/Order";
import dayjs from "dayjs";

const DeliveredOrdersOfMealProvider = ({ orders}:{orders:IOrder[]}) => {

  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();
  const deliveredOrders = orders?.filter((delivered)=>delivered.status==="delivered")
 

  const handleDelete = (order: IOrder) => {
    if (!order?._id) return; // Ensure _id exists before proceeding
  
   

    setSelectedId(order._id);
    setSelectedItem("cancelled"); // Don't mutate state directly
    setModalOpen(true);
  };
  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {

        const res =await updateOrder({status: "cancelled" }, selectedId)
        if (res.success) {
          toast.success(" Order Cancelled successfully!");
          setModalOpen(false);
          
        } else {
          toast.error(res.message);
        }
          
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete meal.");
    }
  };

  const columns: ColumnDef<IOrder>[] = [
   {
  accessorKey: "imageUrls",
  header: "Image",
  cell: ({ row }) => {
    const profileImage = row.original?.customerId?.profileImage?.[0] 
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
      accessorKey: "customername",
      header: "Customer Name",
      cell: ({ row }) => 
        <span className="font-medium">{row.original?.customerId?.name}</span>
     
    },
    {
      accessorKey: "name",
      header: "Meal Name",
      cell: ({ row }) => 
        <span className="font-medium">{row.original.mealName}</span>
     
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

          <button
            className="text-blue-500 cursor-pointer"
            title="Edit"
            onClick={() =>
              router.push(
                `/orderdetails/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

         <button
  className={`text-red-500 cursor-pointer ${
    row.original.status === "delivered" ? "opacity-50 cursor-not-allowed" : ""
  }`}
  title="Delete"
  onClick={() => handleDelete(row.original)}
  disabled={row.original.status === "delivered"}
>
  <Trash className="w-5 h-5" />
</button>

        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Order Meals</h1>
      <div className="overflow-x-auto">
      <NBTable columns={columns} data={Array.isArray(deliveredOrders) ? deliveredOrders : []} />

      </div>
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default DeliveredOrdersOfMealProvider;
