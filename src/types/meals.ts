export type TMealsForm = {
  name: string;
  category: string;
  price: number;
  ingredients: string[];
  portionSize: string;
  available: boolean;
  description: string;
  imageUrls: string[];
  dietaryPreferences: string[];
};