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
import { IOrderCartMeal } from "@/types/cart";
import { useOrderDelete } from "@/hooks/DeleteHandler";
import { useStatusColor } from "@/hooks/StatusColor";


const CancelledOrdersOfMealProvider = ({ orders,meta}:{orders:IOrderCartMeal[],meta:IMeta}) => {

console.log(orders)


  const router = useRouter();
  const cancelledOrders = orders?.filter((cancelled)=>cancelled.selectedMeals[0].status==="Cancelled")
 
  console.log(cancelledOrders)

  const {isModalOpen,
    selectedItem,
    setModalOpen,
    handleDelete,handleDeleteConfirm} = useOrderDelete()

  const {getStatusColor}= useStatusColor()
  console.log(cancelledOrders,'allcancel')

  const columns: ColumnDef<IOrderCartMeal>[] = [
   {
  accessorKey: "imageUrls",
  header: "Image",
  cell: ({ row }) => {
    const profileImage = row.original?.selectedMeals[0].customerId?.profileImage?.[0] 
      || "https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741199867/male-avatar-maker-2a7919_1_ifuzwo.webp";

    return (
      <Image
        src={profileImage}
        alt={row.original?.selectedMeals[0].customerId?.name || "User"}
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
        <span className="font-medium">{row.original?.selectedMeals[0].customerId?.name}</span>
     
    },
    {
      accessorKey: "name",
      header: "Meal Name",
      cell: ({ row }) => 
        <span className="font-medium">{row.original.selectedMeals[0].mealName}</span>
     
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => 
      <span>{row.original.selectedMeals[0].category}</span>,
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
         accessorKey: "cancelledDate", // Ensure the key matches your data
         header: "Cancelled Date",
         cell: ({ row }) => (
           <span>
             {row.original.selectedMeals[0].updatedAt
               ? dayjs(row.original.selectedMeals[0].updatedAt).format("DD-MM-YYYY")
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
    row.original.selectedMeals[0].status === "Cancelled" ? "opacity-50 cursor-not-allowed" : ""
  }`}
  title="Delete"
  onClick={() => handleDelete(row.original)}
  disabled={row.original.selectedMeals[0].status === "Cancelled"}
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
      <NBTable columns={columns} data={Array.isArray(cancelledOrders) ? cancelledOrders : []} />
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

export default CancelledOrdersOfMealProvider;
