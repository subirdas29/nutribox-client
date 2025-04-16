import { IOrder } from "./order";

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
    selectedMeals:IOrder[],
    coupon?:string,
    deliveryCharge:number,
    deliveryArea: string
    deliveryAddress: string
    deliveryDate: Date
    deliveryTime: string,
    transaction?: ITransaction;
    paymentMethod: string,
    
}