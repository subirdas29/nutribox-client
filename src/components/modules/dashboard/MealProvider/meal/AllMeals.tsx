"use client";

import { NBTable } from "@/components/ui/core/NBTable";
import {TMealProvider, TMealsForm } from "@/types/meals";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NBModal/DeleteConfirmationModal";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { updateMeal } from "@/services/Meals";

const AllMeals = ({ meals}:{meals:TMealProvider[]}) => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();


  // const handleDelete = (meal: TMealsForm) => {
  //   console.log(meal,'lfjsdjfsfj')
  //   if (!meal?._id) return; // Ensure _id exists before proceeding
  
  //   console.log(meal._id, "meal");
  
  //   setSelectedId(meal._id);
  //   setSelectedItem("cancelled"); // Don't mutate state directly
  //   setModalOpen(true);
  // };
  
  // const handleDeleteConfirm = async () => {
  //   try {
  //     if (!selectedId) return; // Prevent unnecessary API calls
  
  //     // Create modified data with status "cancelled"
  //     const modifiedData = {
  //       status: "cancelled", // Change status instead of using isDeleted
  //     };
  
  //     const res = await updateMeal(modifiedData, selectedId);
  //     if (res.success) {
  //       toast.success("Order Cancelled successfully!");
  //       setModalOpen(false);
  //     } else {
  //       toast.error(res.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to cancel order.");
  //   }
  // };
  


  const columns: ColumnDef<TMealsForm>[] = [
    {
      accessorKey: "imageUrls",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.imageUrls[0]}
          alt={row.original.name}
          width={50}
          height={50}
          className="w-12 h-12 rounded object-cover"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Meal Name",
      cell: ({ row }) => 
        <span className="font-medium">{row.original.name}</span>
     
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => 
      <span>{row.original.category}</span>,
    },
    {
      accessorKey: "price",
      header: "Price (BDT)",
      cell: ({ row }) => <span>{currencyFormatter(parseFloat(row.original.price.toFixed(2)))}</span>,
    },
    {
      accessorKey: "dietaryPreferences",
      header: "Dietary Preferences",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600">
          {row.original.dietaryPreferences.join(", ")}
        </span>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }) => (
        
        <div className="flex space-x-3 ">
          <button className="text-green-500 cursor-pointer" title="View Details"
          onClick={() =>
            router.push(
              `/mealdetails/${row.original._id}`
            )
          }
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
            title="Edit"
            onClick={() =>
              router.push(
                `/mealprovider/meals/updatemeals/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-red-500 cursor-pointer"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Available Meals</h1>
      <div className="overflow-x-auto">
      <NBTable columns={columns} data={meals[0]?.availableMeals || []} />

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

export default AllMeals;
