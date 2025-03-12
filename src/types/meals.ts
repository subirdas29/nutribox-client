export type TMealsForm = {
  _id:string;
  name: string;
  category: string;
  price: number;

  portionSize: string;
  available: boolean;
  description: string;
  imageUrls: string[];
  ingredients: string | string[]; 
  dietaryPreferences: string | string[];
  mealProvider:TMealProvider;
  rating?:number;
  isDeleted?:boolean
};

export type TMealProvider = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    preferences: string[];
    role: string;
    profileImage?:string[]
    isDeleted: boolean;
    phone: string;
    address: string;
    city: string;
    createdAt: string;
    updatedAt: string;
  };
  cuisineSpecialties: string[];
  availableMeals: TMealsForm[];
  experience: number;
  reviews: string[];
  createdAt: string;
  updatedAt: string;
};


