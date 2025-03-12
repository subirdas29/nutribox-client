"use client";

import { NBTable } from "@/components/ui/core/NBTable";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye } from "lucide-react";
import dayjs from "dayjs";

// import { useState } from "react";
// import { toast } from "sonner";
// import DeleteConfirmationModal from "@/components/ui/core/NBModal/DeleteConfirmationModal";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { IOrder } from "@/types/order";




const MyOrderMeals= ({ myorder}:{myorder:IOrder[]}) => {




  // const [isModalOpen, setModalOpen] = useState(false);
  // const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();


  // const handleDelete = (data:IOrder[]) => {
  //   setSelectedId(data?._id);
  //   setSelectedItem(data?.name);
  //   setModalOpen(true);
  // };

  // const handleDeleteConfirm = async () => {
  //   try {
  //     if (selectedId) {
  //       console.log(selectedId)
  //       toast.success(`Deleted ${selectedItem} successfully!`);
  //       setModalOpen(false);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to delete meal.");
  //   }
  // };

  const columns: ColumnDef<IOrder>[] = [
    // {
    //   accessorKey: "imageUrls",
    //   header: "Image",
    //   cell: ({ row }) => (
    //     <Image
    //       src={row.original.imageUrls[0]}
    //       alt={row.original.name}
    //       width={50}
    //       height={50}
    //       className="w-12 h-12 rounded object-cover"
    //     />
    //   ),
    // },
    {
      accessorKey: "name",
      header: "Meal Name",
      cell: ({ row }) => 
        <span className="font-medium">{row.original.mealName}</span>
     
     
    },
    {
      accessorKey: "portionSize",
      header: "PortionSize",
      cell: ({ row }) => 
      <span>{row.original.portionSize}</span>,
    },
    {
      accessorKey: "price",
      header: "Price (BDT)",
      cell: ({ row }) => <span>{currencyFormatter(parseFloat(row.original.totalPrice.toFixed(2)))}</span>,
    },
    
    {
      accessorKey: "dietaryPreferences",
      header: "Dietary Preferences",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {row.original?.customizations && row.original.customizations?.length > 0
            ? row.original.customizations.join(", ")
            : "No dietary preferences"}
        </span>
      ),
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
        const status = row.original.status;
    
        // Define a function to determine the text color based on the status
        const getStatusColor = (status: string) => {
          switch (status) {
            case "pending":
              return "text-yellow-500";  
            case "in-progress":
              return "text-blue-500";  
            case "delivered":
              return "text-green-500"; 
            default:
              return "text-gray-500";  
          }
        };
    
        return (
          <span className={`font-bold ${getStatusColor(status ?? "default")}`}>
          {status ?? "Unknown"}
        </span>
        
        );
      },
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
  className={` ${
    ["in-progress", "delivered","cancelled"].includes(row.original.status!)
      ? "opacity-50 cursor-not-allowed  "
      : "hover:text-blue-500 text-gray-700, cursor-pointer"
  }`}
  title="Edit"
  disabled={["in-progress", "delivered","cancelled"].includes(row.original.status!)}
  onClick={() => {
    if (row.original.status === "pending") {
      router.push(`/orderdetails/${row.original._id}`);
    }
  }}
>
  <Edit className="w-5 h-5" />
</button>


          {/* <button
            className="text-red-500 cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row.original._id)}
          >
            <Trash className="w-5 h-5" />
          </button> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Order Meals</h1>
      <div className="overflow-x-auto">
      <NBTable columns={columns} data={myorder} />

      </div>
      {/* <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      /> */}
    </div>
  );
};

export default MyOrderMeals;
