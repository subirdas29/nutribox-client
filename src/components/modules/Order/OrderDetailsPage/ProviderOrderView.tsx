'use client'
import { useState } from 'react'
import { Clock, CookingPot, CheckCircle, Utensils, MapPin, CalendarDays, ChefHat, XCircle } from "lucide-react"
import Image from 'next/image'
import { format } from "date-fns"
import { updateOrder } from '@/services/Order'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

type OrderStatus = 'pending' | 'in-progress' | 'delivered' | 'cancelled'

interface IOrderDetails {
  _id: string
  status: OrderStatus
  mealName: string
  totalPrice: number
  deliveryDate: Date
  deliveryTime: string
  deliveryAddress: string
  portionSize: string
  customizations: string[]
  specialInstructions: string
}

const statusConfig = {
  pending: {
    color: 'bg-amber-500',
    icon: <Clock className="w-5 h-5" />,
    illustration: 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741285770/istockphoto-1384432216-612x612-removebg-preview_b9e7xo.png',
    title: 'Order Pending!',
    description: 'Waiting for chef confirmation'
  },
  'in-progress': {
    color: 'bg-blue-500',
    icon: <CookingPot className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/3079/3079165.png',
    title: 'Preparation in Progress',
    description: 'Meal is being prepared'
  },
  delivered: {
    color: 'bg-green-500', 
    icon: <CheckCircle className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/751/751463.png',
    title: 'Order Delivered!',
    description: 'Meal successfully delivered'
  },
  cancelled: {
    color: 'bg-red-500',
    icon: <XCircle className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/753/753345.png',
    title: 'Order Cancelled!',
    description: 'This order has been cancelled'
  }
}

const StatusUpdateForm = ({ 
  initialValues, 
  onSubmit, 
  onCancel 
}: {
  initialValues: IOrderDetails
  onSubmit: (data: IOrderDetails) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<IOrderDetails>(initialValues)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
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
            value={formData.status}
            onValueChange={value => setFormData({ ...formData, status: value as OrderStatus })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancel Order</SelectItem>
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

export const ProviderOrderView = ({ order }: { order: IOrderDetails }) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)

  const handleStatusUpdate = (updatedData: IOrderDetails) => {
    console.log(updatedData,'provider')
    setIsStatusModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-green-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <Image
              src={statusConfig[order.status].illustration}
              alt="Status"
              fill
              className="object-contain drop-shadow-lg"
              priority
            />
          </div>
          
          <Badge className={`${statusConfig[order.status].color} hover:${statusConfig[order.status].color} mb-4`}>
            {statusConfig[order.status].icon}
            <span className="ml-2 text-sm font-medium capitalize">
              {order.status.replace('-', ' ')}
            </span>
          </Badge>

          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {statusConfig[order.status].title}
          </h1>
          <p className="text-green-600 max-w-md mx-auto">
            {statusConfig[order.status].description}
          </p>

          {!['delivered', 'cancelled'].includes(order.status) && (
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
                    <p className="font-medium text-green-800">{order.mealName}</p>
                    <p className="text-sm text-green-600">{order.portionSize} Portion</p>
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

                {order.specialInstructions && (
                  <div>
                    <Label className="flex items-center gap-2 text-green-600 mb-2">
                      Special Instructions
                    </Label>
                    <p className="text-green-800">{order.specialInstructions}</p>
                  </div>
                )}
              </div>
            </div>

            {order.customizations?.length > 0 && (
              <div className="pt-4 border-t border-green-100">
                <Label className="text-green-600">Customizations</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {order.customizations.map((item, index) => (
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
            <StatusUpdateForm 
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