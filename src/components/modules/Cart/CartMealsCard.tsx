/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import { Trash, Edit,  Recycle, Bike, CalendarDays, Clock, Salad, Leaf, House, IdCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CartMeal, citySelector, decrementOrderQuantity, deselectMeal, grandTotalSelector, incrementOrderQuantity, orderedMealSelector, portionCostSelector,  removeMeal, orderSelectedMealSelector , selectMeal, shippingAddressSelector, shippingCostSelector,  subTotalSelectSelector, toggleSelectAllMeals, updateCity, updateShippingAddress,  orderedSelector, updateDate, updateTime, deliveryDateSelector, deliveryTimeSelector } from '@/redux/features/cartSlice';
import emptycart from '../../../assets/empty-cart/Empty-Cart.png';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { useState, } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cities } from '@/constant/cities';
import CartModal from './CartModal';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/services/Order';



export default function CartMealsCard() {

  const dispatch = useAppDispatch();

  const meals = useAppSelector(orderedMealSelector);
  const portionTotal = useAppSelector(portionCostSelector);

  const subTotal = useAppSelector(grandTotalSelector);
  const selectedCity = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  
  const selectedMeals = useAppSelector(orderSelectedMealSelector);
  const subSelectorTotal = useAppSelector(subTotalSelectSelector)
  const order = useAppSelector(orderedSelector)

  const date = useAppSelector(deliveryDateSelector)
  const time = useAppSelector(deliveryTimeSelector)
  

  const [showModal, setShowModal] = useState(false);  
  const [selectedModalMeals, setSelectedModalMeals] = useState<CartMeal | null>(null);


  const user = useUser();

  const router = useRouter();


  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");

    try {
        if (!user) {
            router.push("/login");
            throw new Error("Please login first.");
        }

        if (!selectedCity) throw new Error("City is missing");
        if (!shippingAddress) throw new Error("Shipping address is missing");
        if (selectedMeals.length === 0) throw new Error("Cart is empty, what are you trying to order ??");

        const finalOrder = {
          ...order,
           deliveryCharge:shippingCost
        }

   
           const res = await createOrder(finalOrder);
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
            } 

      else{
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
      
};
  


  const handleCustomizationMeal = (meal:CartMeal)=>{
    setSelectedModalMeals(meal)
    setShowModal(true)
  }
  
  const handleCity = (city:string) =>{
    dispatch(updateCity(city))
  }
 
  const handleShippingAddress = (address:string) =>{

    dispatch(updateShippingAddress(address))
  }

  const handleDate = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0]
      dispatch(updateDate(formattedDate)); 
    }
  };
  
  const handleTime = (time:string) =>{
    dispatch(updateTime(time))
  }

  const isAllSelected = selectedMeals.length === meals.length

   const handleSelectAll = () => {
          dispatch(toggleSelectAllMeals(!isAllSelected));
      };
  

    const isMealSelected = (mealId:string) =>
      selectedMeals.some((selected) => selected._id === mealId)
    ;
    
  const handleSelectMealRedux = (meal: CartMeal) => {
    if (selectedMeals.some((selected) => selected._id === meal._id)) {
      dispatch(deselectMeal({ _id: meal._id })); 
    } else {
      dispatch(selectMeal(meal)); 
    }
  };
  
  const handleIncrement = (meal:{_id:string,basePrice:number, orderQuantity:number}) => {
    
    dispatch(incrementOrderQuantity({ 
      _id: meal._id, 
      basePrice: meal.basePrice, 
      orderQuantity: meal.orderQuantity,
      portionTotal
  }));
   
  };

  const handleDecrement = (meal:{_id:string,basePrice:number, orderQuantity:number}) => {
    
    dispatch(decrementOrderQuantity({ 
      _id: meal._id, 
      basePrice: meal.basePrice, 
      orderQuantity: meal.orderQuantity,
      portionTotal
  }));
   
  };

  
  const groupedMeals: Record<string, CartMeal[]> = meals.reduce((acc, meal) => {
    const providerName = meal.mealProvider?.userId?.name || "Unknown Provider";
    
    if (!acc[providerName]) {
      acc[providerName] = [];
    }
    
    acc[providerName].push(meal);
    return acc;
  }, {} as Record<string, CartMeal[]>);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-10"
        >
          <h1 className="text-4xl font-bold text-emerald-800 font-serif">NutriBox Cart</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {Object.keys(groupedMeals).length === 0 ? (
              <CardContent className="text-center">
                <p>Your Cart is Empty</p>
                <Image src={emptycart} alt='empty-cart' width={500} height={500} />
              </CardContent>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 border bg-white/80 shadow-lg border-emerald-200 rounded-lg py-2 px-4">
                  <div className="flex items-center">
                    <input 
                       type="checkbox"
                       checked={isAllSelected}
                       onChange={handleSelectAll}
                      className="mr-2 accent-green-500"
                    />
                    <span className="text-emerald-800 font-medium">Select All</span>
                  </div>
                </div>


                {Object.entries(groupedMeals).map(([provider, providerMeals]) => (
                  <Card key={provider} className="border-emerald-200 bg-white/80 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl text-emerald-800">{provider}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {providerMeals.map((item) => (
                        <motion.div
                          key={item._id}
                          whileHover={{ scale: 1.01 }}
                          className="flex flex-row gap-4 p-4 rounded-lg border border-emerald-100 bg-white shadow-sm"
                        >
                          <input 
                            type="checkbox" 
                            checked={isMealSelected(item._id)}
                            onChange={() => handleSelectMealRedux(item)}
                            className="mr-2 accent-green-500"
                          />
                          <Image width={100} height={100} src={item.imageUrls[0]} alt={item.name} className="h-32 w-32 rounded-lg object-cover" />
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-emerald-900">{item.name}</h3>
                            <p className="text-emerald-700">Base Price: {currencyFormatter(Number(item.basePrice))}</p>
                            <p className="text-emerald-700">Total Price: {currencyFormatter(Number(item.price))}</p>
                            <p className="text-emerald-700">{item.portionSize}</p>
                            <div className="mt-4 flex items-center">
                              <button className="px-3 py-1 border" onClick={() => handleDecrement(item)}>-</button>
                              <span className="px-4">{item.orderQuantity}</span>
                              <button className="px-3 py-1 border" onClick={() => handleIncrement(item)}>+</button>
                              <button onClick={() => dispatch(removeMeal(item._id))} className="ml-4 text-sm text-red-600"> <Trash /> Remove </button>
                              <button onClick={() => handleCustomizationMeal(item)} className="ml-4 text-sm text-blue-600"> <Edit /> Edit </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  
                  </Card>
                ))}
              </>
            )}
          </div>


          <div className="space-y-6">
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
              <Label className='flex items-center gap-2 text-primary/80'><House/>Delivery Area</Label>
                <div className="flex gap-2 flex-wrap" >
                <Select  onValueChange={(city) => handleCity(city)}>
            <SelectTrigger className="mb-5 w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => 
              {
                const formattedCity = city.split(' (')[0].toLowerCase().replace(/\s+/g, '-');
           {
           
            return(
              <SelectItem key={city} value={formattedCity}>
                {city}
              </SelectItem>
            )
           }
             
              }
              )}
            </SelectContent>
          </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className='flex items-center gap-2 text-primary/80'><IdCard/>Delivery Address</Label>
                <Textarea
                value={shippingAddress}
                  onChange={(e) => handleShippingAddress(e.target.value)}
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
          selected={date ? new Date(date) : null}
        onChange={(date: Date | null) => handleDate(date)} 
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
    onChange={(e) => handleTime(e.target.value)}
    className="[&::-webkit-calendar-picker-indicator]:bg-green-500 [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:text-primary [&::-webkit-calendar-picker-indicator]:rounded-md"
    required
  />
</div>
          </CardContent>
        </Card>
            <Card className="border-emerald-200 bg-white/80 shadow-lg">
            <CardHeader className="bg-primary/5">
            <div className="flex items-center gap-3">
              <Leaf className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
          </CardHeader>
              <CardContent className="space-y-4">
             
                <div className="flex justify-between">
                  <span className="text-emerald-700">Selected Total</span>
                  <span className="font-medium text-emerald-900">{currencyFormatter(Number(subSelectorTotal))}</span>
                </div>
                 <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Bike className="w-5 h-5 text-primary" />
                                <span>Delivery Fee ({selectedCity})</span>
                              </div>
                              <div className="flex items-center font-medium">
                               
                                {currencyFormatter(shippingCost)}
                              </div>
                            </div>
                              <div className="pt-4 border-t">
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                              <Salad className="w-6 h-6 text-primary" />
                                              <span className="font-bold text-lg">Total Amount</span>
                                            </div>
                                            <div className="flex items-center text-primary font-bold text-lg">
                                         
                                              <span className="animate-pulse">
                                                {currencyFormatter(subTotal)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
     {
       <Button 
       className={`w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-6 text-md md:text-lg shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-all 
         ${subSelectorTotal === 0 || !selectedCity || !shippingAddress || !date ? 'opacity-50 cursor-not-allowed' : ''}`} 
       disabled={subSelectorTotal === 0 || !selectedCity || !shippingAddress || !date} onClick={handleOrder}
     >
       Confirm Order
     </Button>
     }
        <div className="flex items-center justify-center text-sm text-emerald-600">
          <Recycle className="h-4 w-4 mr-2" />
          <span>100% compostable packaging</span>
        </div>
      </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      {selectedModalMeals && showModal && (
  <CartModal 
    meal={selectedModalMeals}
    onClose={() => setShowModal(false)}  
  />
)}
    </div>
  );
}
