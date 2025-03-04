export interface IMeals {
    _id:string
    name: string
    cuisineSpecialties: string[]
    mealsOffered: MealsOffered[]
    pricing: Pricing
    experience: number
    customerReviews: CustomerReview[]
    location: Location
    contact: Contact
  }
  
  export interface MealsOffered {
    name: string
    category: string
    price: number
    ingredients: string[]
    available: boolean
  }
  
  export interface Pricing {
    minPrice: number
    maxPrice: number
  }
  
  export interface CustomerReview {
    user: string
    rating: number
    comment: string
  }
  
  export interface Location {
    city: string
    address: string
  }
  
  export interface Contact {
    phone: string
    email: string
  }
  