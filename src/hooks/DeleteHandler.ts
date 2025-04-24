"use client"

import { updateOrder } from "@/services/Order";
import { IFlatOrder } from "@/types/order";
import { useState } from "react";
import { toast } from "sonner";

export const useOrderDelete = ()=>{
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
    
    const handleDelete = (order: IFlatOrder) => {
      if (!order?._id) return; 
      setSelectedId(order._id);
      setSelectedItem("Cancelled"); 
      setModalOpen(true);
    };
    const handleDeleteConfirm = async () => {
      try {
        if (selectedId) {
  
          const res =await updateOrder({status: "Cancelled" }, selectedId)
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
    return{
        isModalOpen,
        selectedItem,
        setModalOpen,
        handleDelete,handleDeleteConfirm
    }
}