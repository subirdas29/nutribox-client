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

const AllMeals = ({ meals}:{meals:TMealsForm[]}) => {
  console.log(meals,'new')
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<TMealsForm | null>(null);
  const router = useRouter();


  const handleDelete = (meal: TMealsForm) => {

    if (!meal?._id) return; // Ensure _id exists before proceeding
  
    setSelectedId(meal._id);
    setSelectedItem(meal); 
    setSelectedName(meal.name);
    setModalOpen(true);

  };
  
  const handleDeleteConfirm = async () => {
    try {
      if (!selectedItem || !selectedId) return; 
      const modifiedData = {
        ...selectedItem,
        isDeleted:true, 
      };

      const res = await updateMeal(modifiedData, selectedId);
      if (res.success) {
        toast.success("Order Cancelled successfully!");
        setModalOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order.");
    }
  };
  


  const columns: ColumnDef<TMealsForm>[] = [
    {
      accessorKey: "imageUrls",
      header: "Image",
      cell: ({ row }) => 
     
        (
          <Image
            src={row.original.imageUrls[0]}
            alt={row.original.name}
            width={50}
            height={50}
            className="w-12 h-12 rounded object-cover"
          />
        )
      
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
      accessorKey: "available",
      header: "Availability Status", // More meaningful header
      cell: ({ row }) => (
        <span
          style={{
            color: row.original.available ? "green" : "red", // Green for Available, Red for Unavailable
            fontWeight: "bold",
          }}
        >
          {row.original.available ? "Available" : "Unavailable"}
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
      <h1 className="text-xl font-bold mb-4">All Meals</h1>
      <div className="overflow-x-auto">
      <NBTable columns={columns} data={meals || []} />

      </div>
      <DeleteConfirmationModal
        name={selectedName}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AllMeals;
