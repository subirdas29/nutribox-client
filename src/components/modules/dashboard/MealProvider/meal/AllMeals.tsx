"use client";

import { NMTable } from "@/components/ui/core/NBTable";
import {TMealProvider, TMealsForm } from "@/types/meals";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash, Eye } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/NBModal/DeleteConfirmationModal";
import { useRouter } from "next/navigation";
import { currencyFormatter } from "@/lib/currencyFormatter";

const AllMeals = ({ meals}:{meals:TMealProvider[]}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const router = useRouter();


  const handleDelete = (meal:TMealsForm) => {
    setSelectedId(meal?._id);
    setSelectedItem(meal?.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        console.log(selectedId)
        toast.success(`Deleted ${selectedItem} successfully!`);
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete meal.");
    }
  };

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
      <NMTable columns={columns} data={meals[0]?.availableMeals || []} />

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
