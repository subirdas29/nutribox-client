// import { IUser } from "./user";

import { TMealsForm } from "./meals";
import { IUser } from "./user";



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
  status?: "Pending" | "In-Progress" | "Delivered" | "Cancelled"|"Failed"; 
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
  mealName:string;
  quantity: number;
  basePrice: number;
  orderPrice: number;
  portionSize: string;
  customizations: string[];
  specialInstructions: string;
  status?: "Pending" | "In-Progress" | "Delivered" | "Cancelled" |"Failed"; // Optional with strict values
  updatedAt?:string;
  createdAt?:string
}

