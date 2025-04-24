"use client";

import { NBTable } from "@/components/ui/core/NBTable";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, Eye } from "lucide-react";
import Image from "next/image";

import DeleteConfirmationModal from "@/components/ui/core/NBModal/DeleteConfirmationModal";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/lib/currencyFormatter";

import dayjs from "dayjs";

import TablePagination from "@/components/ui/core/NBTable/TablePagination";
import { IMeta } from "@/types/meta";
import { useOrderDelete } from "@/hooks/DeleteHandler";
import { useStatusColor } from "@/hooks/StatusColor";
import { useAllOrderMeals } from "../AllOrderMealsContext";
import { IFlatOrder } from "@/types/order";

const DeliveredOrdersOfCustomer = ({ meta}:{meta:IMeta}) => {


    const myorders = useAllOrderMeals()

  const router = useRouter();
  const deliveredOrders = myorders?.filter((ongoing)=>ongoing.status==="Delivered")
 

  const {isModalOpen,
    selectedItem,
    setModalOpen,
    handleDelete,handleDeleteConfirm} = useOrderDelete()

  const {getStatusColor}= useStatusColor()

  const columns: ColumnDef<IFlatOrder>[] = [
   {
  accessorKey: "imageUrls",
  header: "Image",
  cell: ({ row }) => {
    const mealImages = row.original?.mealId

    const mealImage = typeof mealImages === 'object' ? mealImages.imageUrls?.[0]
      : "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp";

    return (
      <Image
        src={mealImage}
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
    row.original.status === "Delivered" ? "opacity-50 cursor-not-allowed" : ""
  }`}
  title="Delete"
  onClick={() => handleDelete(row.original)}
  disabled={row.original.status === "Cancelled"}
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
      <TablePagination totalPage={meta?.totalPage}/>
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

export default DeliveredOrdersOfCustomer;
