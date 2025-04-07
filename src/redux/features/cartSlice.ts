import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TMealsForm } from "@/types/meals";

export interface CartMeal extends TMealsForm {
    orderQuantity: number;
    basePrice:number;
    isUpdated:boolean
    instruction:string,
    customizations:string[]
}

interface InitialState {
    meals: CartMeal[];
    city: string;
    shippingAddress: string;
    deliveryDate: string; 
    deliveryTime: string;
    selectedMeals: CartMeal[]
}

const initialState: InitialState = {
    meals: [],
    city: "",
    shippingAddress: "",
    selectedMeals: [],
    deliveryDate: new Date().toISOString(),
    deliveryTime: ""
   
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addMeal: (state, action) => {
        
            const { _id, mealProvider,price } = action.payload;

            if(!mealProvider && !mealProvider._id) return

            const mealToAdd = state.meals.find((meal) => meal._id === _id);

            if (mealToAdd) {
                mealToAdd.orderQuantity += 1;
                mealToAdd.price = mealToAdd.basePrice * mealToAdd.orderQuantity
            } else {
                state.meals.push({ ...action.payload, orderQuantity: 1,basePrice:price,isUpdated:false });
             
            }
        },

      
        selectMeal: (state, action) => {
            const { _id, price,orderQuantity } = action.payload;
            const existingMeal = state.selectedMeals.find((meal) => meal._id === _id);
            if (!existingMeal) {
                state.selectedMeals.push({ ...action.payload, basePrice: price, orderQuantity });
            }
        },


          deselectMeal: (state, action) => {
            const { _id } = action.payload;
            state.selectedMeals = state.selectedMeals.filter((meal) => meal._id !== _id);
        },

        toggleSelectAllMeals: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
               
                state.selectedMeals = [...state.meals];
            } else {
              
                state.selectedMeals = [];
            }
        },

     // Update meal details (e.g., price, portion size) in both meals and selectedMeals
updateMealState: (state, action: PayloadAction<{ _id: string ,orderQuantity:number, basePrice: number, portionSize: string,portionTotal:number,instruction:string,customizations:string[], }>) => {
    const { _id, basePrice, orderQuantity, portionSize,portionTotal,instruction,customizations,} = action.payload;



    // Update in meals array
    const mealInMeals = state.meals.find((m) => m._id === _id);
    if (mealInMeals) {
       
        mealInMeals.price = basePrice * orderQuantity + portionTotal;
        mealInMeals.portionSize = portionSize;
        mealInMeals.isUpdated = true;
        mealInMeals.customizations = customizations;
        mealInMeals.instruction = instruction
    }
    state.meals.forEach(meal => {
        if (meal._id !== _id) {
          meal.isUpdated = false; 
        }
      });

    // Update in selectedMeals array
    const mealInSelectedMeals = state.selectedMeals.find((m) => m._id === _id);
    if (mealInSelectedMeals) {
        mealInSelectedMeals.price = basePrice * orderQuantity + portionTotal;
        mealInSelectedMeals.portionSize = portionSize;
        mealInSelectedMeals.isUpdated = true;
        mealInSelectedMeals.customizations = customizations;
        mealInSelectedMeals.instruction = instruction
    }

    state.selectedMeals.forEach(meal => {
        if (meal._id !== _id) {
          meal.isUpdated = false; 
        }
      });
},
incrementOrderQuantity: (state, action) => {
    const { _id, basePrice,portionTotal } = action.payload;

    const mealToIncrementMeals = state.meals.find((meal) => meal._id === _id);
    if (mealToIncrementMeals) {
        mealToIncrementMeals.orderQuantity += 1;
    
        mealToIncrementMeals.price = basePrice * mealToIncrementMeals.orderQuantity + (portionTotal || 0);
    }

    const mealToIncrementSelected = state.selectedMeals.find((meal) => meal._id === _id);
    if (mealToIncrementSelected) {
        mealToIncrementSelected.orderQuantity += 1;

        mealToIncrementSelected.price = basePrice * mealToIncrementSelected.orderQuantity + (portionTotal || 0);
    }
},

decrementOrderQuantity: (state, action) => {
    const { _id, basePrice,portionTotal } = action.payload;

    const mealToDecrement = state.meals.find((meal) => meal._id === _id);
    if (mealToDecrement && mealToDecrement.orderQuantity > 1) {
        mealToDecrement.orderQuantity -= 1;
      
        mealToDecrement.price = basePrice * mealToDecrement.orderQuantity + (portionTotal || 0);
    }

    const mealToDecrementSelected = state.selectedMeals.find((meal) => meal._id === _id);
    if (mealToDecrementSelected && mealToDecrementSelected.orderQuantity > 1) {
        mealToDecrementSelected.orderQuantity -= 1;

        mealToDecrementSelected.price = basePrice * mealToDecrementSelected.orderQuantity + (portionTotal || 0);
    }
},


        removeMeal: (state, action) => {
            state.meals = state.meals.filter((meal) => meal._id !== action.payload);
            state.selectedMeals = state.selectedMeals.filter((select) => select._id !== action.payload);
        },

        
        
        
        updateCity: (state, action) => {
            state.city = action.payload;
        },

        updateShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },

        clearCart: (state) => {
            const selectedMealIds = state.selectedMeals.map(meal => meal._id)
            state.meals = state.meals.filter(meal => !selectedMealIds.includes(meal._id));
            state.selectedMeals = [];
            state.city = "";
            state.shippingAddress = "";
        },

        allClearCart: (state) => {
            state.meals = [];
            state.selectedMeals = [];
            state.city = "";
            state.shippingAddress = "";
        },
    },
});

export const orderedMealSelector = (state: RootState) => state.cart.meals;
export const orderSelectedMealSelector = (state: RootState) => state.cart.selectedMeals;

export const orderedSelector = (state: RootState) => ({
    selectedMeals: state.cart.selectedMeals.map((meal) => ({
        mealId: meal._id,
        mealProviderId:meal.mealProvider._id,
        mealName:meal.name,
        category:meal.category,
        quantity: meal.orderQuantity,
        basePrice: meal.basePrice,
        totalPrice:meal.price,
        portionSize: meal.portionSize,
        customizations: meal.customizations || [],
        specialInstructions: meal.instruction || "",
        shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
        deliveryArea: state.cart.city,
        deliveryAddress: state.cart.shippingAddress,
        deliveryDate: state.cart.deliveryDate ? new Date(state.cart.deliveryDate) : new Date(), 
        deliveryTime: state.cart.deliveryTime,
        status:"pending" as const,
        paymentMethod: "Online",
        
    })),
  
});




export const shippingCostSelector = (state: RootState) => {
    
    if (state.cart.city && state.cart.city === "dhaka" && state.cart.meals.length >= 1) {
        return 60;
    } else if (state.cart.city && state.cart.city === "outside-dhaka" && state.cart.meals.length >= 1) {
        return 120;
    } else if (state.cart.city && state.cart.city === "international" && state.cart.meals.length >= 1) {
        return 250;
    } 
    else{
        return 0
    }
};
export const portionCostSelector = (state: RootState) => {
    const prices: { [key: string]: number }  = {
      small: 0,
      medium: 150,
      large: 250,
    };
  
    const updatedMeal = state.cart.meals.find(meal => meal.isUpdated);
  
    
    return updatedMeal ? prices[updatedMeal.portionSize] || 0 : 0;
  };
  


  export const subTotalSelectSelector = (state: RootState) => {

    
    return state.cart.selectedMeals.reduce((acc, meal) => {
        return acc + meal.price;
    }, 0) 
};





    
export const grandTotalSelector = (state: RootState) => subTotalSelectSelector(state) + shippingCostSelector(state);


export const citySelector = (state: RootState) => state.cart.city;

export const shippingAddressSelector = (state: RootState) => state.cart.shippingAddress;

export const { addMeal,updateMealState,  incrementOrderQuantity, decrementOrderQuantity, removeMeal, updateCity, updateShippingAddress, clearCart,selectMeal,deselectMeal,toggleSelectAllMeals,allClearCart} =
    cartSlice.actions;

export default cartSlice.reducer;
