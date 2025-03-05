export interface IUser  {
    name: string;
    email: string;
    password: string;
    role: "customer" | "mealprovider"; 
    phone?: string;
    isDeleted?: boolean;
    imageUrl?: string;
    address?: string;
    city?: string;
    passwordChangedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
  };