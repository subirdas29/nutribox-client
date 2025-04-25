'use client'
import { useState } from 'react'
import { Clock, CookingPot, CheckCircle, MapPin, CalendarDays, ChefHat, XCircle } from "lucide-react"
import Image from 'next/image'
import { format } from "date-fns"

import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {  OrderStatus } from '..'
import { MealProviderModal } from './MealProviderModal'
import { IOrderCartMeal  } from '@/types/cart'




const statusConfig = {
  Pending: {
    color: 'bg-amber-500',
    icon: <Clock className="w-5 h-5" />,
    illustration: 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741285770/istockphoto-1384432216-612x612-removebg-preview_b9e7xo.png',
    title: 'Order Pending!',
    description: 'Waiting for chef confirmation'
  },
  'In-Progress': {
    color: 'bg-blue-500',
    icon: <CookingPot className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/3079/3079165.png',
    title: 'Preparation in Progress',
    description: 'Meal is being prepared'
  },
  Delivered: {
    color: 'bg-green-500', 
    icon: <CheckCircle className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/751/751463.png',
    title: 'Order Delivered!',
    description: 'Meal successfully delivered'
  },
  Cancelled: {
    color: 'bg-red-500',
    icon: <XCircle className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/753/753345.png',
    title: 'Order Cancelled!',
    description: 'This order has been cancelled'
  }
}



export const ProviderOrderView = ({ order }: { order: IOrderCartMeal }) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  console.log(order)

  const status = order.selectedMeals[0].status as OrderStatus
  
  const handleStatusUpdate = (updatedData: IOrderCartMeal ) => {
    console.log(updatedData,'provider')
    setIsStatusModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src={statusConfig[status].illustration}
              alt="Status"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          
          <Badge className={`${statusConfig[status].color} hover:${statusConfig[status].color} mb-4`}>
            {statusConfig[status].icon}
            <span className="ml-2 text-sm font-medium capitalize">
              {status.replace('-', ' ')}
            </span>
          </Badge>

          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {statusConfig[status].title}
          </h1>
          <p className="text-green-600 max-w-md mx-auto">
            {statusConfig[status].description}
          </p>

          {!['delivered', 'cancelled'].includes(status) && (
            <Button 
              className="mt-6 bg-green-600 hover:bg-green-700"
              onClick={() => setIsStatusModalOpen(true)}
            >
              Update Status
            </Button>
          )}
        </div>

        <Card className="border-0 shadow-lg mb-12">
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 text-green-600 mb-2">
                    <ChefHat className="w-4 h-4" />
                    Meal Details
                  </Label>
                  <div className="space-y-1">
                    <p className="font-medium text-green-800">{order.selectedMeals[0].mealName}</p>
                    <p className="text-sm text-green-600">{order.selectedMeals[0].portionSize} Portion</p>
                  </div>
                </div>

                <div>
                  <Label className="flex items-center gap-2 text-green-600 mb-2">
                    <CalendarDays className="w-4 h-4" />
                    Delivery Schedule
                  </Label>
                  <div className="space-y-1">
                    <p className="text-green-800">{format(order.deliveryDate, "PPP")}</p>
                    <p className="text-sm text-green-600">{order.deliveryTime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 text-green-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    Delivery Address
                  </Label>
                  <p className="whitespace-pre-line text-green-800">{order.deliveryAddress}</p>
                </div>

                {order.selectedMeals[0].specialInstructions && (
                  <div>
                    <Label className="flex items-center gap-2 text-green-600 mb-2">
                      Special Instructions
                    </Label>
                    <p className="text-green-800">{order.selectedMeals[0].specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {order.selectedMeals[0].customizations?.length > 0 && (
              <div className="pt-4 border-t border-green-100">
                <Label className="text-green-600">Customizations</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {order.selectedMeals[0].customizations.map((item, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-sm font-normal text-green-800 border-green-200"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-800">
                Update Order Status
              </DialogTitle>
            </DialogHeader>
            <MealProviderModal 
              initialValues={order}
              onSubmit={handleStatusUpdate}
              onCancel={() => setIsStatusModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}