import { TMealsForm } from "./meals";
import { IOrder } from "./order";
import { IUser } from "./user";

export interface ITransaction {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  }

export interface IOrderCartMeal{
    _id?:string,
    selectedMeals:IOrder[],
    coupon?:string,
    deliveryCharge:number,
    deliveryArea: string
    deliveryAddress: string
    deliveryDate: string
    deliveryTime: string,
    transaction?: ITransaction;
    paymentMethod: string,
    createdAt?:string
    
}


export interface IOrderCartMealView {
  _id?:string,
  customerId?:IUser,
  selectedMeals: {
    _id?:string;
    mealId: string | TMealsForm;
    mealProviderId: string;
    category:string;
    mealName:string;
    quantity: number;
    basePrice: number;
    orderPrice: number;
    portionSize: string;
    customizations: string[];
    specialInstructions: string;
    status?: "Pending" | "In-Progress" | "Delivered" | "Cancelled"  // Optional with strict values
    updatedAt?:string;
    createdAt?:string
  }; 
  coupon?:string,
    deliveryCharge:number,
    deliveryArea: string
    deliveryAddress: string
    deliveryDate: string
    deliveryTime: string,
    transaction?: ITransaction;
    paymentMethod: string,
    createdAt?:string
}