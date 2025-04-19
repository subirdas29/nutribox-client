"use client"
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { updateOrder } from '@/services/Order'
import { IOrderCartMealView } from '@/types/cart'
import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { OrderStatus } from '..'


    export const MealProviderModal = ({ 
        initialValues, 
        onSubmit, 
        onCancel 
      }: {
        initialValues: IOrderCartMealView
        onSubmit: (data: IOrderCartMealView) => void
        onCancel: () => void
      }) => {
        const [formData, setFormData] = useState<IOrderCartMealView>(initialValues)
      
        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault()
          try {
              if (!formData._id) {
                      toast.error("Order ID is missing");
                      return;
                    }
            const res = await updateOrder(formData, formData._id)
            if (res.success) {
              toast.success("Status updated successfully!")
              onSubmit(formData)
            } else {
              toast.error(res.message)
            }
          } catch (error) {
            console.error(error)
            toast.error("Failed to update status")
          }
        }
      
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Order Status</Label>
                <Select
                  value={formData.selectedMeals.status}
                  onValueChange={value => setFormData({...formData, 
                    selectedMeals:{
                      ...formData.selectedMeals,
                      status:value as OrderStatus
                    }})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In-Progress">In Progress</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancel Order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
      
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                Update Status
              </Button>
            </div>
          </form>
        )
      }

