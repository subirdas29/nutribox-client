

export interface IOrder {
  _id:string;
  mealId: string;
  mealName:string;
  basePrice:number;
  deliveryCharge:number;
  portionPrice:number;
  totalPrice: number;
  orderDate: Date;
  deliveryDate: string;
  deliveryTime?: string;
  portionSize: string
  deliveryArea: string
  deliveryAddress: string; // 
  // Specific address
  status:string;
  customizations?: string[];
  specialInstructions?:string
}