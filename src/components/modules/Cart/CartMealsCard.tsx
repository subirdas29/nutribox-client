// "use client"
// import { ShoppingCart, Leaf, Recycle, Sun, Sprout, Utensils, Clock, Flame, Heart, ChevronRight, Delete, Trash } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { TMealsForm } from '@/types/meals';
// import { useAppDispatch, useAppSelector } from '@/redux/hook';
// import { decrementOrderQuantity, grandTotalSelector, incrementOrderQuantity, orderedMealSelector, removeMeal } from '@/redux/features/cartSlice';
// import { currencyFormatter } from '@/lib/currencyFormatter';

// export default function CartMealsCard() {
//   const dispatch = useAppDispatch()
//     const meals = useAppSelector(orderedMealSelector)
//     const subTotal = useAppSelector(grandTotalSelector)
//     console.log(meals)

//     const handleMealRemove = (meal:string) =>{
//       dispatch(removeMeal(meal))
//     }

//     const handleIncrementMeal = (meal:string)=>{
//       dispatch(incrementOrderQuantity(meal))
//     }
//     const handleDecrementMeal = (meal:string)=>{
//       dispatch(decrementOrderQuantity(meal))
//     }
 



//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Animated Header */}
//         <motion.div 
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="flex items-center justify-center mb-10"
//         >
//           <div className="relative">
//             <Leaf className="h-10 w-10 text-emerald-600 mr-3" />
//             <Utensils className="h-5 w-5 text-emerald-600 absolute -right-1 -bottom-1" />
//           </div>
//           <h1 className="text-4xl font-bold text-emerald-800 font-serif">GreenMeal Box</h1>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             <motion.div
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm shadow-lg">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center">
//                     <ShoppingCart className="h-6 w-6 text-emerald-600 mr-2" />
//                     <CardTitle className="text-2xl text-emerald-800">Your Eco-Meals</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {meals?.map((item) => (
//                     <motion.div
//                       key={item._id}
//                       whileHover={{ scale: 1.01 }}
//                       className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border border-emerald-100 bg-white shadow-sm"
//                     >
//                       <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 border-emerald-200 group">
//                         <Image
//                           width={500}
//                           height={500}
//                           src={item.imageUrls[0]}
//                           alt={item.name}
//                           className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
//                         />
//                         {/* <div className="absolute top-2 right-2 flex gap-1">
//                           {item.badges.includes('organic') && (
//                             <Badge variant="eco" className="bg-emerald-100 text-emerald-800">
//                               <Sprout className="h-3 w-3 mr-1" /> Organic
//                             </Badge>
//                           )}
//                           {item.badges.includes('sustainable') && (
//                             <Badge variant="eco" className="bg-amber-100 text-amber-800">
//                               <Recycle className="h-3 w-3 mr-1" /> Sustainable
//                             </Badge>
//                           )}
//                         </div> */}
//                         {/* {item.favorite && (
//                           <div className="absolute top-2 left-2">
//                             <Heart className="h-5 w-5 fill-emerald-500 text-emerald-500" />
//                           </div>
//                         )} */}
//                       </div>
                      
//                       <div className="flex-1">
//                         <h3 className="text-lg font-medium text-emerald-900">{item.name}</h3>
//                         <div className="flex items-center gap-4 mt-1 text-sm text-emerald-700">
//                           <span className="flex items-center">
//                             <Clock className="h-4 w-4 mr-1" />
//                             {/* {item.prepTime} */}
//                           </span>
//                           <span className="flex items-center">
//                             <Flame className="h-4 w-4 mr-1" />
//                             {/* {item.calories} kcal */}
//                           </span>
//                         </div>
//                         <p className="mt-2 text-emerald-700">{currencyFormatter(Number(item.price.toFixed(2)))}</p>
                        
//                         <div className="mt-4 flex items-center">
//                           <div className="flex items-center border border-emerald-200 rounded-full bg-emerald-50">
//                             <button className="h-8 w-8 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 rounded-l-full transition-colors" onClick={()=>handleDecrementMeal(item._id)}>
//                               -
//                             </button>
//                             <span className="h-8 w-8 flex items-center justify-center text-emerald-900 font-medium">
//                               {item.orderQuantity}
//                             </span>
//                             <button className="h-8 w-8 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 rounded-r-full transition-colors" onClick={()=>handleIncrementMeal(item._id)}>
//                               +
//                             </button>
//                           </div>
//                           <button onClick={()=>handleMealRemove(item._id)} className="ml-4 text-sm text-emerald-600 hover:text-emerald-800 transition-colors flex items-center">
//                            <Trash/> Remove
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>

//           {/* Right Column - Summary */}
//           <div className="space-y-6">
//             <motion.div
//               initial={{ x: 20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="space-y-6"
//             >
//               <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm shadow-lg">
//                 <CardHeader>
//                   <CardTitle className="text-xl text-emerald-800">Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex justify-between">
//                     <span className="text-emerald-700">Subtotal</span>
//                     <span className="font-medium text-emerald-900">
//                         {currencyFormatter(Number(subTotal.toFixed(2)))}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-emerald-700">Delivery</span>
//                     <span className="font-medium text-emerald-900">Carbon Neutral</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-emerald-700">Eco Savings</span>
//                     <span className="font-medium text-emerald-600">{currencyFormatter(Number(-10.99))}</span>
//                   </div>
//                   <div className="border-t border-emerald-100 pt-4 flex justify-between">
//                     <span className="text-lg font-medium text-emerald-800">Total</span>
//                     <span className="text-lg font-bold text-emerald-900">
                      
//                            {currencyFormatter(Number((subTotal-10.99).toFixed(2)))}
//                     </span>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex flex-col gap-3">
//                   <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-6 text-lg shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/50 transition-all">
//                     Checkout Securely <ChevronRight className="ml-2 h-5 w-5" />
//                   </Button>
//                   <div className="flex items-center justify-center text-sm text-emerald-600">
//                     <Recycle className="h-4 w-4 mr-2" />
//                     <span>100% compostable packaging</span>
//                   </div>
//                 </CardFooter>
//               </Card>

//               {/* Environmental Impact */}
//               <Card className="border-emerald-200 bg-white/80 backdrop-blur-sm shadow-lg">
//                 <CardHeader>
//                   <div className="flex items-center">
//                     <Leaf className="h-5 w-5 text-emerald-600 mr-2" />
//                     <CardTitle className="text-xl text-emerald-800">Your Green Impact</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center p-3 rounded-lg bg-emerald-50/70">
//                     <div className="bg-emerald-100 p-3 rounded-full mr-4">
//                       <Recycle className="h-6 w-6 text-emerald-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-emerald-900">3 plastic items saved</p>
//                       <p className="text-sm text-emerald-600">By choosing our packaging</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center p-3 rounded-lg bg-amber-50/70">
//                     <div className="bg-amber-100 p-3 rounded-full mr-4">
//                       <Sun className="h-6 w-6 text-amber-600" />
//                     </div>
//                     <div>
//                       <p className="font-medium text-amber-900">1.8 kg CO₂ saved</p>
//                       <p className="text-sm text-amber-600">Local ingredient sourcing</p>
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button variant="outline" className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors">
//                     Share Your Impact
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Eco Tip */}
//       <AnimatePresence>
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.8 }}
//           className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border border-emerald-200 shadow-lg rounded-full px-4 py-2 flex items-center"
//         >
//           <span className="text-emerald-700 text-sm font-medium">🌱 Your order saves 3 plastic items this week!</span>
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }