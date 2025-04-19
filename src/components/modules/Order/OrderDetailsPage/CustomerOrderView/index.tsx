'use client'
import { useState } from 'react'

import { Clock, CookingPot, CheckCircle, Pencil, Truck, Utensils,  MapPin, CalendarDays, ChefHat, XCircle } from "lucide-react"
import Image from 'next/image'



import { Label } from '@/components/ui/label'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'


import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import {   OrderStatus } from '..'
import dayjs from 'dayjs'
import {  IOrderCartMealView, ITransaction } from '@/types/cart'
import { OrderForm } from './CustomerModal'
import {  IOrder } from '@/types/order'



const bankStatusConfig = {

  Failed: {
    color: 'bg-red-600',
    icon: <XCircle className="w-5 h-5" />,
    illustration: 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1744663952/payment-failed_kobid2.png',
    title: 'Payment Failed!',
    description: 'We couldn’t process your payment. Please try again or use a different method.'
  },
}

const statusConfig = {
  
  Pending: {
    color: 'bg-amber-500',
    icon: <Clock className="w-5 h-5" />,
    illustration: 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741285770/istockphoto-1384432216-612x612-removebg-preview_b9e7xo.png',
    title: 'Awaiting Chef Approval',
    description: 'We’ve got your payment. Waiting for the chef to confirm your order'
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




export const CustomerOrderView = ({ order }: { order: IOrderCartMealView}) => {
  console.log(order,'joy')
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  // const [review, setReview] = useState({ rating: 0, comment: '' })



  if(Array.isArray(order.selectedMeals))
    return null

  const singleOrder = order.selectedMeals as IOrder
  const transaction = order.transaction as ITransaction
  


  const handleEditSubmit = (updatedData: IOrderCartMealView) => {
    console.log(updatedData,'customer')
    setIsEditModalOpen(false)
  }

  // const handleReviewSubmit = () => {
  //   alert('Review submitted successfully!')
  //   setReview({ rating: 0, comment: '' })
  // }

  if(!order){
    
      <p className="text-red-500 text-center">Order status not available</p>
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-48 h-48 mx-auto ">
          {singleOrder.status && (
  <Image
    src={statusConfig[singleOrder.status] ?.illustration|| bankStatusConfig['Failed']?.illustration || "/fallback-image.png"}
    alt="Status"
    fill
    className="object-contain drop-shadow-lg"
    priority
  />
)}
          </div>
          
          {singleOrder?.status && statusConfig[singleOrder.status] && (
  <Badge className={`${statusConfig[singleOrder.status].color} hover:${statusConfig[singleOrder.status].color} mb-4`}>
    {statusConfig[singleOrder.status]?.icon}
    <span className="ml-2 text-sm font-medium capitalize">
      {singleOrder.status.replace('-', ' ')}
    </span>
  </Badge>
)}




{transaction?.bank_status === "Success" && singleOrder?.status && statusConfig[singleOrder.status] ? (
  <>
    <h1 className="text-3xl font-bold text-green-800 mb-2">
      {statusConfig[singleOrder.status].title}
    </h1>
    <p className="text-green-600 max-w-md mx-auto">
      {statusConfig[singleOrder.status].description}
    </p>
  </>
) : (
 <>  

<h1 className="text-3xl font-bold text-green-800 mb-2">
  {bankStatusConfig['Failed']?.title ?? "Unknown Status"}
  </h1>
  <p className="text-green-600 max-w-md mx-auto">
  {bankStatusConfig['Failed']?.description ?? "Unknown Status"}
  </p>
</>
)}


          {transaction.bank_status === "Success" && singleOrder?.status === 'Pending' && (
            <Button 
              className="mt-6 bg-green-600 hover:bg-green-700"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Order
            </Button>
          )}
        </div>

        <div className="mb-12 px-8">
        <div className={`${transaction.bank_status === 'Failed' ?'hidden' : 'relative h-2 bg-green-100 rounded-full mb-8' } `}>
    {transaction.bank_status === "Success" && singleOrder?.status && statusConfig[singleOrder?.status] && (
      <div
        className={`absolute h-2 ${statusConfig[singleOrder.status]?.color || "bg-gray-300"} rounded-full transition-all duration-500`}
        style={{
          width: 
            singleOrder.status === "Pending" ? "33%" : 
            singleOrder.status === "In-Progress" ? "66%" : "100%",
        }}
      />
    )
    }
  </div>
          
  <div className={`grid ${transaction.bank_status==="Success"? 'grid-cols-4' : 'grid-cols-1'}  gap-4 text-center`}>
  {
  transaction.bank_status === "Success" ?
  (

      Object.keys(statusConfig) as OrderStatus[]).map((stage) => (
    <div key={stage} className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
        ${singleOrder?.status === stage ? statusConfig[stage]?.color || 'bg-green-100' : 'bg-green-100'}`}>
        {statusConfig[stage]?.icon || "?"}
      </div>
      <span className="mt-2 text-sm font-medium text-green-800 capitalize">
        {stage.replace("-", " ")}
      </span>
    </div>
  )
  
) : 

    (
      // Object.keys(bankStatusConfig) as BankStatus[]).map((status) => (

<div key={'Failed'} className="flex flex-col justify-center items-center ">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
        ${ bankStatusConfig['Failed']?.color || 'bg-green-100'}`}>
        {bankStatusConfig['Failed']?.icon || "?"}
      </div>
      <span className="mt-2 text-sm font-medium text-green-800 capitalize">
        {/* {status.replace("-", " ")} */}
        Failed
      </span>
    </div>

  // )
)

}
</div>

        </div>

        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="w-full bg-green-100">
            <TabsTrigger value="details" className="data-[state=active]:bg-white">
              <Utensils className="w-4 h-4 mr-2 text-green-600" />
              Order Details
            </TabsTrigger>
            <TabsTrigger value="tracking" className="data-[state=active]:bg-white">
              <Truck className="w-4 h-4 mr-2 text-green-600" />
              Tracking
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2 text-green-600 mb-2">
                        <ChefHat className="w-4 h-4" />
                        Meal Details
                      </Label>
                      <div className="space-y-1">
                        <p className="font-medium text-green-800">{singleOrder?.mealName}</p>
                        <p className="text-sm text-green-600">{singleOrder?.portionSize} Portion</p>
                      </div>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 text-green-600 mb-2">
                        <CalendarDays className="w-4 h-4" />
                        Delivery Schedule
                      </Label>
                      <div className="space-y-1">
                        <p className="text-green-800">{dayjs(order?.deliveryDate).format("DD-MM-YYYY")}</p>
                        
                        <p className="text-sm text-green-600">{order?.deliveryTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2 text-green-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address
                      </Label>
                      <p className="whitespace-pre-line text-green-800">{order?.deliveryAddress}</p>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 text-green-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        Order Quantity
                      </Label>
                      <p className="whitespace-pre-line text-green-800">{singleOrder?.quantity}</p>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 text-green-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        Payment
                      </Label>
                      <p className="whitespace-pre-line text-green-800">{transaction.bank_status}</p>
                    </div>


                    {singleOrder?.specialInstructions && (
                      <div>
                        <Label className="flex items-center gap-2 text-green-600 mb-2">
                          <span>📝</span>
                          Special Instructions
                        </Label>
                        <p className="text-green-800">{singleOrder?.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {singleOrder?.customizations.length > 0 && (
                  <div className="pt-4 border-t border-green-100">
                    <Label className="text-green-600">Customizations</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {singleOrder?.customizations.map((item, index) => (
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
          </TabsContent>

          <TabsContent value="tracking">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">Delivery Partner</h3>
                      <p className="text-green-600 text-sm">Special Chef - Estimated arrival in your desired time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
{/* 
        {order?.status === 'Delivered' && (
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-green-800">Rate Your Experience</h2>
                  <p className="text-green-600 mt-2">Help us improve with your feedback</p>
                </div>

                <div className="flex justify-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="icon"
                      className={`w-12 h-12 rounded-full ${
                        review.rating >= star 
                          ? 'bg-green-100 text-green-600' 
                          : 'text-green-400'
                      }`}
                      onClick={() => setReview({...review, rating: star})}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </Button>
                  ))}
                </div>

                <Textarea
                  placeholder="Write your review..."
                  className="min-h-[100px] text-green-800"
                  value={review.comment}
                  onChange={(e) => setReview({...review, comment: e.target.value})}
                />

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleReviewSubmit}
                >
                  Submit Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )} */}

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-800">
                <Pencil className="w-5 h-5" />
                Edit Order Details
              </DialogTitle>
            </DialogHeader>
            <OrderForm 
              initialValues={order}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}