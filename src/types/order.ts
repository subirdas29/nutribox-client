import { IUser } from "./user";


export interface IOrder {

  _id?:string;
  mealId: string;
  category:string;
  customerId?:IUser;
  mealName:string;
  basePrice:number;
  deliveryCharge:number;
  portionPrice:number;
  totalPrice: number;
  orderDate?: Date;
  deliveryDate: Date
  deliveryTime: string
  portionSize: string
  deliveryArea: string
  deliveryAddress: string; // 
  status?: 'pending' | 'in-progress' | 'delivered' | 'cancelled'
  customizations?: string[];
  specialInstructions?:string
}