// app/meals/[mealId]/order/page.tsx
'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  CheckIcon, 
  Loader2Icon, 
  Clock, 
  CalendarDays, 
  Utensils, 
  Flame, 
  Salad, 
  Bike, 
  ChefHat
} from "lucide-react";

import { TMealsForm } from "@/types/meals";
import { currencyFormatter } from "@/lib/currencyFormatter";
import { toast } from "sonner";
import { createOrder } from "@/services/Order";
import { IOrder } from "@/types/order";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// const currencyFormatter = (value: number) => {
//   return new Intl.NumberFormat('en-IN').format(value);
// };

const OrderPage = ({ ordermeal }: { ordermeal: TMealsForm }) => {


  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [customizations, setCustomizations] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPortion, setSelectedPortion] = useState("small");
  const [deliveryArea, setDeliveryArea] = useState("dhaka");
  const [address, setAddress] = useState("");
  const [instruction, setInstruction] = useState("");

  // Price calculations
  const basePrice = ordermeal?.price;
  const [mealPrice, setMealPrice] = useState(basePrice);
  const [deliveryCharge, setDeliveryCharge] = useState(60);
  const [totalPrice, setTotalPrice] = useState(basePrice + 60);

  // Portion price effect
  useEffect(() => {
    const portionAdd = {
      small: 0,
      medium: 150,
      large: 250
    };
    const newMealPrice = basePrice + portionAdd[selectedPortion as keyof typeof portionAdd];
    setMealPrice(newMealPrice);
  }, [selectedPortion, basePrice]);

  // Delivery charge effect
  useEffect(() => {
    const charges = {
      dhaka: 60,
      'outside-dhaka': 120,
      international: 200
    };
    setDeliveryCharge(charges[deliveryArea as keyof typeof charges]);
  }, [deliveryArea]);

  // Total price effect
  useEffect(() => {
    setTotalPrice(mealPrice + deliveryCharge);
  }, [mealPrice, deliveryCharge]);


  const customizationOptions = [
    { label: "Extra Spicy", icon: "🌶️", desc: "Add extra chili flakes" },
    { label: "Less Oil", icon: "🛢️", desc: "Reduce oil content" },
    { label: "No Onion", icon: "🧅", desc: "Exclude onions completely" },
    { label: "Extra Sauce", icon: "🥫", desc: "Double dipping sauce" },
    { label: "Gluten Free", icon: "🌾", desc: "No gluten ingredients" },
    { label: "Extra Cheese", icon: "🧀", desc: "Add cheese topping" }
  ];

  const handleCustomization = (option: string) => {
    setCustomizations(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option) 
        : [...prev, option]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!address || !date) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    const orderData:IOrder = {
      mealId: ordermeal?._id,
      mealName: ordermeal?.name,
      category: ordermeal?.category,
      basePrice: ordermeal?.price,
      portionSize: selectedPortion,

      status: "pending",
      deliveryArea,
      orderQuantity:1,
      totalPrice,
      deliveryDate: date ? new Date(date) : new Date(),
      deliveryTime: time,
      deliveryAddress: address,
      customizations,
      specialInstructions: instruction,
      mealProviderId: "",
      quantity: 0,
      shippingAddress: "",
      paymentMethod: ""
    };

    try {
     

        const res = await createOrder(orderData);
          
        console.log(res)

            if (res.success) {
                toast.success(res.message);
                console.log(res.data,'order')
                // router.push(`/orderdetails/${res.data._id}`);
                if(res.data){
                  setTimeout(()=>{
                    window.location.href = res.data
                  },1000)
                }
            } else {
                toast.error(res.message);
               console.log(res);
            }

  
    } catch (error) {
      console.error('Order submission error:', error);
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-8 group">
          <div className="p-3 bg-primary/10 rounded-lg transition-all duration-300 group-hover:rotate-12">
            <ChefHat className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold border-l-4 border-primary pl-4">
              Customize Your Meal
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-1">
              <Utensils className="w-4 h-4" />
              Personalized dining experience
            </p>
          </div>
        </div>

        {/* Portion Size Selector */}
        <Card className="mb-6 border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Utensils className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Select Portion Size</h2>
            </div>
          </CardHeader>
 

          <CardContent className="pt-6">
          <div className="space-y-4">
              <div className="space-y-2">
                <Label>Portion Size</Label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={selectedPortion === 'small' ? 'default' : 'outline'}
                    onClick={() => setSelectedPortion('small')}
                  >
                    Small
                  </Button>
                  <Button
                    variant={selectedPortion === 'medium' ? 'default' : 'outline'}
                    onClick={() => setSelectedPortion('medium')}
                  >
                    Medium (+৳150)
                  </Button>
                  <Button
                    variant={selectedPortion === 'large' ? 'default' : 'outline'}
                    onClick={() => setSelectedPortion('large')}
                  >
                    Large (+৳250)
                  </Button>
                </div>
              </div>

             
            </div>
          </CardContent>

        </Card>

        {/* Delivery Section */}
        <Card className="mb-6 border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Bike className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Delivery Details</h2>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Delivery Area</Label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={deliveryArea === 'dhaka' ? 'default' : 'outline'}
                    onClick={() => setDeliveryArea('dhaka')}
                  >
                    Dhaka City (+৳60)
                  </Button>
                  <Button
                    variant={deliveryArea === 'outside-dhaka' ? 'default' : 'outline'}
                    onClick={() => setDeliveryArea('outside-dhaka')}
                  >
                    Outside Dhaka (+৳120)
                  </Button>
                  <Button
                    variant={deliveryArea === 'international' ? 'default' : 'outline'}
                    onClick={() => setDeliveryArea('international')}
                  >
                    International (+৳200)
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Delivery Address</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter full delivery address"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
      <Label className="flex items-center gap-2 text-primary/80">
        <CalendarDays className="w-5 h-5" />
        Select Delivery Date
      </Label>
      <DatePicker
        selected={date}
        onChange={(date: Date | null) => setDate(date)} 
        minDate={new Date()} // Disable past dates
        className="rounded-lg border shadow-sm p-2" 
      />
    </div>

            <div className="space-y-2">
  <Label className="flex items-center gap-2 text-primary/80">
    <Clock className="w-5 h-5" />
    Preferred Time (optional)
  </Label>
  <Input 
    type="time"
    value={time}
    onChange={(e) => setTime(e.target.value)}
    className="[&::-webkit-calendar-picker-indicator]:bg-green-500 [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:text-primary [&::-webkit-calendar-picker-indicator]:rounded-md"
    required
  />
</div>
          </CardContent>
        </Card>

        {/* Customizations Section */}
            {/* Customizations Section */}
            <Card className="mb-6 border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Meal Preferences</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Select your customizations (Multiple choices allowed)
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 pt-6">
            {customizationOptions?.map((option) => (
              <div 
                key={option.label}
                className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-300
                  ${customizations.includes(option.label) 
                    ? "border-2 border-primary bg-primary/10 ring-2 ring-primary/20" 
                    : "border hover:border-primary/30 bg-background"}`}
                onClick={() => handleCustomization(option.label)}
              >
                <div className={`absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full 
                  ${customizations.includes(option.label) 
                    ? "bg-primary text-white" 
                    : "bg-muted/50 text-transparent"}`}>
                  <CheckIcon className="w-3 h-3" />
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {option.label}
                      {customizations.includes(option.label) && (
                        <span className="text-xs text-primary animate-pulse">(Selected)</span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">{option.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6 border-primary/20">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Special Instruction(optional)</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Write any instruction if you want
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent >
          <textarea
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  placeholder="Write Any Instruction"
                  className="border-2 p-4 w-full rounded-xl"
                  required
                />
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
            <div className="mr-1 text-primary" >
                  ৳
                  </div>
              <h2 className="text-xl font-semibold">Order Breakdown</h2>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                <span>Meal Price (size:{selectedPortion})</span>
              </div>
              <div className="flex items-center font-medium">
              <div className="mr-1 text-primary" >
                  ৳
                  </div>
                {currencyFormatter(mealPrice)}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bike className="w-5 h-5 text-primary" />
                <span>Delivery Fee ({deliveryArea})</span>
              </div>
              <div className="flex items-center font-medium">
              <div className="mr-1 text-primary" >
                  ৳
                  </div>
                {currencyFormatter(deliveryCharge)}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Salad className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg">Total Amount</span>
                </div>
                <div className="flex items-center text-primary font-bold text-lg">
                  <div className="mr-1" >
                  ৳
                  </div>
                  <span className="animate-pulse">
                    {currencyFormatter(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <Button type="submit"
          className="w-full h-14 text-lg font-bold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
          onClick={handleSubmit}
          disabled={isSubmitting || !address || !date}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2Icon className="w-5 h-5 animate-spin" />
              Finalizing Your Order...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5" />
              Confirm & Pay Now
            </div>
          )}
        </Button>
      </form>
      </div>
    </div>
  );
};

export default OrderPage;