import { Clock, CookingPot, CheckCircle, Pencil, Truck, Utensils, Star, MapPin, CalendarDays, ChefHat, XCircle } from "lucide-react"


export const bankStatusConfig = {

    Failed: {
      color: 'bg-red-600',
      icon: <XCircle className="w-5 h-5" />,
      illustration: 'https://res.cloudinary.com/dsgnwjmlv/image/upload/v1744663952/payment-failed_kobid2.png',
      title: 'Payment Failed!',
      description: 'We couldn’t process your payment. Please try again or use a different method.'
    },
  }
  
  export const statusConfig = {
    
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
  