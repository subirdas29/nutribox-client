// import { IUser } from "./user";

import { TMealsForm } from "./meals";
import { IUser } from "./user";


// export interface IOrder {

//   _id?:string;
//   mealId: string;
//   mealProviderId:string;
//   quantity:number;
//   // category:string;
//   customerId?:IUser;
//   // mealName:string;
//   basePrice:number;
//   // deliveryCharge:number;
//   // portionPrice:number;
//   totalPrice: number;
//   // orderDate?: Date;
//   deliveryDate: Date
//   deliveryTime: string
//   portionSize: string
//   deliveryArea: string
//   deliveryAddress: string; // 
//   status?: 'pending' | 'in-progress' | 'delivered' | 'cancelled'
//   customizations?: string[];
//   paymentMethod: "Online" | "CashOnDelivery";
//   specialInstructions?:string;
//   // updatedAt?:string
// }

export interface IMealOrder {
  _id?:string;
  mealId: TMealsForm;
  mealProviderId: string;
    category:string;
    customerId?:IUser;
  mealName:string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  portionSize: string;
  customizations: string[];
  specialInstructions: string;
  shippingAddress: string;
  deliveryArea: string;
  deliveryAddress: string;
  deliveryDate: Date;
  deliveryTime: string;
  status?: "pending" | "in-progress" | "delivered" | "cancelled"; // Optional with strict values
  paymentMethod: string;
  updatedAt?:string;
  createdAt?:string
}

// interfaces/IOrder.ts
export interface IOrder {
  _id?:string;
  mealId: string;
  mealProviderId: string;
    category:string;
    customerId?:IUser;
    orderQuantity:number;
  mealName:string;
  quantity: number;
  basePrice: number;
  totalPrice: number;
  portionSize: string;
  customizations: string[];
  specialInstructions: string;
  shippingAddress: string;
  deliveryArea: string;
  deliveryAddress: string;
  deliveryDate: Date;
  deliveryTime: string;
  status?: "pending" | "in-progress" | "delivered" | "cancelled"; // Optional with strict values
  paymentMethod: string;
  updatedAt?:string;
  createdAt?:string
}