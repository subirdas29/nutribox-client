"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { updateOrder } from '@/services/Order'
import { IOrderCartMeal } from '@/types/cart'

import { BookOpenText, CalendarDays, Home, PackageOpen, Timer } from 'lucide-react'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import { toast } from 'sonner'
import "react-datepicker/dist/react-datepicker.css";


export const OrderForm = ({
  initialValues,
  onSubmit,
  onCancel
}: {
  initialValues: IOrderCartMeal
  onSubmit: (data: IOrderCartMeal) => void
  onCancel: () => void
}) => {


  const [formData, setFormData] = useState<IOrderCartMeal>(initialValues)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!formData._id) {
        toast.error("Order ID is missing");
        return;
      }

      const updateData = {
        ...formData,
        selectedMeals: formData.selectedMeals
      }


      const res = await updateOrder(updateData, formData?._id, formData?.selectedMeals?.[0]?._id as string)
      if (res.success) {
        toast.success("Order updated successfully!")
        onSubmit(formData)

      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Failed to update order")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h1 className="flex items-center gap-2 text-primary/80">
            <PackageOpen />
            Portion Size</h1>
          <Select
            value={formData.selectedMeals[0].portionSize}
            onValueChange={value => {
              const updatedMeals = [...formData.selectedMeals];
              updatedMeals[0] = {
                ...updatedMeals[0],
                portionSize: value,
              };
              setFormData({
                ...formData,
                selectedMeals: updatedMeals,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select portion size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Small">Small</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Large">Large</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delivery Date */}
        <div className="space-y-2">
          <h1 className="flex items-center gap-2 text-primary/80">

            <CalendarDays className="w-5 h-5" />
            Delivery Date
          </h1>
          <DatePicker
            selected={formData.deliveryDate ? new Date(formData.deliveryDate) : new Date()}
            onChange={(date) =>
              setFormData({ ...formData, deliveryDate: date ? date.toISOString().split("T")[0] : "", }) // Ensures non-null value
            }
            minDate={new Date()} // Disable past dates
            className="rounded-lg border shadow-sm p-2"
          />
        </div>

        <div className="space-y-2">
          <h1 className=' flex items-center gap-2 text-primary/80'>  <Timer className="w-5 h-5" />Delivery Time</h1>
          <Input
            type="time"
            value={formData.deliveryTime}
            onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <h1 className='flex items-center gap-2 text-primary/80'>
            <Home />
            Delivery Address</h1>
          <Textarea
            value={formData.deliveryAddress}
            onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <h1 className=' flex items-center gap-2 text-primary/80'>
            <BookOpenText />
            Special Instructions</h1>
          <Textarea
            value={formData.selectedMeals[0].specialInstructions}
            onChange={e => {
              const updatedMeals = [...formData.selectedMeals];
              updatedMeals[0] = {
                ...updatedMeals[0],
                specialInstructions: e.target.value,
              };
              setFormData({
                ...formData,
                selectedMeals: updatedMeals,
              });
            }}
     
            placeholder="Any special requests..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Save Changes
        </Button>
      </div>
    </form>
  )
}





