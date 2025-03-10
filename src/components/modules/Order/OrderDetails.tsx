
'use client'
import { JSX, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent} from "@/components/ui/card"
import { 
  Clock, 
  CookingPot, 
  CheckCircle, 
  Pencil, 
  Truck, 
  Utensils,
  Star,
  MapPin,
  CalendarDays,
  ChefHat
} from "lucide-react"
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
// import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { updateOrder } from '@/services/Order'
import { toast } from 'sonner'
import DatePicker from 'react-datepicker'


type OrderStatus = 'pending' | 'in-progress' | 'delivered'

export interface IOrderDetails {
  _id:string
  status: OrderStatus
  mealName:string
  totalPrice: number
  deliveryDate: Date
  deliveryTime: string
  deliveryAddress:string
  portionSize:string
  customizations: string[]
  specialInstructions:string
  editable: boolean
}

const statusConfig: Record<OrderStatus, {
  color: string
  icon: JSX.Element
  illustration: string
  title: string
  description: string
}> = {
  pending: {
    color: 'bg-green-400',
    icon: <Clock className="w-5 h-5" />,
    illustration: 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1741285770/istockphoto-1384432216-612x612-removebg-preview_b9e7xo.png',
    title: 'Order Pending!',
    description: 'Your order is being processed'
  },
  'in-progress': {
    color: 'bg-green-500',
    icon: <CookingPot className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/3079/3079165.png',
    title: 'Cooking in Progress',
    description: 'Chef is preparing your meal'
  },
  delivered: {
    color: 'bg-green-600',
    icon: <CheckCircle className="w-5 h-5" />,
    illustration: 'https://cdn-icons-png.flaticon.com/512/751/751463.png',
    title: 'Order Delivered!',
    description: 'Enjoy your meal!'
  }
}

const OrderForm = ({
  initialValues,
  onSubmit,
  onCancel,
  editableFields
}: {
  initialValues: IOrderDetails
  onSubmit: (data:IOrderDetails) => void
  onCancel: () => void
  editableFields?: Partial<Record<keyof IOrderDetails, boolean>>
}) => {
  const [formData, setFormData] = useState<IOrderDetails>(initialValues)
  const [date, setDate] = useState<Date | null>(null);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
     try {
          const res = await updateOrder(formData, formData?._id);
         
          if (res.success) {
            toast.success("Meal updated successfully!");
          } else {
            toast.error(res.message);
          }
          console.log(res)
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong!");
        }
    console.log(formData._id)
  }

  

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {editableFields?.portionSize && (
          <div className="space-y-2">
            <Label>Portion Size</Label>
            <Select 
              value={formData.portionSize}
              onValueChange={value => setFormData({...formData, portionSize: value})}
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
        )}

        {editableFields?.deliveryDate && (
          <div className="space-y-2">
               <Label className="flex items-center gap-2 text-primary/80">
                 <CalendarDays className="w-5 h-5" />
                 Select Delivery Date
               </Label>
               <DatePicker
                 selected={date}
                 onChange={(date: Date | null) => setDate(date)} // Update date on selection
                 minDate={new Date()} // Disable past dates
                 className="rounded-lg border shadow-sm p-2" // Apply your custom styles here
               />
             </div>
        )}

        {editableFields?.deliveryTime && (
          <div className="space-y-2">
            <Label>Delivery Time</Label>
            <Input
              type="time"
              value={formData.deliveryTime}
              onChange={e => setFormData({...formData, deliveryTime: e.target.value})}
            />
          </div>
        )}

        {editableFields?.deliveryAddress && (
          <div className="space-y-2">
            <Label>Delivery Address</Label>
            <Textarea
              value={formData.deliveryAddress}
              onChange={e => setFormData({...formData, deliveryAddress: e.target.value})}
            />
          </div>
        )}

        {editableFields?.specialInstructions && (
          <div className="space-y-2">
            <Label>Special specialInstructions</Label>
            <Textarea
              value={formData.specialInstructions}
              onChange={e => setFormData({...formData, specialInstructions: e.target.value})}
              placeholder="Any special requests..."
            />
          </div>
        )}
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

const OrderPageDetails = ({ orderdetails }: { orderdetails: IOrderDetails}) => {

  const [order, setOrder] = useState<IOrderDetails>({
   _id:orderdetails?._id || '',
    status: orderdetails?.status ||'pending',
    totalPrice: orderdetails?.totalPrice,
    mealName:orderdetails?.mealName,
    deliveryDate: new Date(),
    deliveryTime: orderdetails?.deliveryTime || '',
    deliveryAddress: orderdetails?.deliveryAddress || "",
    portionSize: orderdetails?.portionSize || "",
    customizations: orderdetails?.customizations || [""],
    specialInstructions: orderdetails?.specialInstructions || "",
    editable: true
  })

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [review, setReview] = useState({ rating: 0, comment: '' })

  const handleEditSubmit = (updatedData: IOrderDetails) => {
    setOrder(prev => ({
      ...prev,
      ...updatedData,
      editable: prev.status === 'pending'
    }))
    setIsEditModalOpen(false)
  }

  const handleReviewSubmit = () => {
    alert('Review submitted successfully!')
    setReview({ rating: 0, comment: '' })
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

          {order.editable && (
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
          <div className="relative h-2 bg-green-100 rounded-full mb-8">
            <div 
              className={`absolute h-2 ${statusConfig[order.status].color} rounded-full transition-all duration-500`}
              style={{
                width: 
                  order.status === 'pending' ? '33%' : 
                  order.status === 'in-progress' ? '66%' : '100%'
              }}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            {(Object.keys(statusConfig) as OrderStatus[]).map((stage) => (
              <div key={stage} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${order.status === stage ? statusConfig[stage].color : 'bg-green-100'}`}>
                  {statusConfig[stage].icon}
                </div>
                <span className="mt-2 text-sm font-medium text-green-800 capitalize">
                  {stage.replace('-', ' ')}
                </span>
              </div>
            ))}
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
                          <span>📝</span>
                          Special Instructions
                        </Label>
                        <p className="text-green-800">{order.specialInstructions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {order.customizations.length > 0 && (
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

        {order.status === 'delivered' && (
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
        )}

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
              editableFields={{
                portionSize: true,
                deliveryDate: true,
                deliveryTime: true,
                deliveryAddress: true,
                specialInstructions: true
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default OrderPageDetails