import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    selectedMeals: CartMeal[]
    deliveryDate: string; 
    deliveryTime: string;
    totalPrice: number,
    deliveryArea: string,
    deliveryAddress: string,
   
}

const initialState: InitialState = {
    meals: [],
    selectedMeals: [],
    deliveryDate: "",
    deliveryTime: "",
    deliveryAddress:"",
    deliveryArea:"",
    totalPrice:0, 
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
            state.deliveryArea = action.payload;
        },
       

        updateShippingAddress: (state, action) => {
            state.deliveryAddress = action.payload;
        },

        updateDate: (state, action) => {
            state.deliveryDate = action.payload;
        },
        updateTime: (state, action) => {
            state.deliveryTime = action.payload;
        },

        clearCart: (state) => {
            const selectedMealIds = state.selectedMeals.map(meal => meal._id)
            state.meals = state.meals.filter(meal => !selectedMealIds.includes(meal._id));
            state.selectedMeals = [];
            state.deliveryDate= "";
            state.deliveryTime= "";
            state.deliveryAddress="";
            state.deliveryArea="";
            state.totalPrice=0;
           
        },

        allClearCart: (state) => {
            state.meals = [];
            state.selectedMeals = [];
            state.deliveryDate= "";
            state.deliveryTime= "";
            state.deliveryAddress="";
            state.deliveryArea="";
            state.totalPrice=0;
          
        },
    },
});

export const orderedMealSelector = (state: RootState) => state.cart.meals;
export const orderSelectedMealSelector = (state: RootState) => state.cart.selectedMeals;

export const orderedSelector = createSelector(
    [(state: RootState) => state.cart],
    (cart) => {
      const selectedMeals = cart.selectedMeals.map((meal) => ({
        mealId: meal._id,
        mealProviderId: meal.mealProvider._id,
        mealName: meal.name,
        category: meal.category,
        quantity: meal.orderQuantity,
        basePrice: meal.basePrice,
        orderPrice:meal.price,
        portionSize: meal.portionSize,
        customizations: meal.customizations || [],
        specialInstructions: meal.instruction || "",
      }));
  
      return {
        selectedMeals,
        deliveryArea: cart.deliveryArea,
        deliveryAddress: cart.deliveryAddress,
        deliveryDate: cart.deliveryDate,
        deliveryTime: cart.deliveryTime,
        paymentMethod: "Online",
      };
    }
  );




export const shippingCostSelector = (state: RootState) => {
    
    if (state.cart.deliveryArea && state.cart.deliveryArea === "dhaka" && state.cart.meals.length >= 1) {
        return 60;
    } else if (state.cart.deliveryArea && state.cart.deliveryArea === "outside-dhaka" && state.cart.meals.length >= 1) {
        return 120;
    } else if (state.cart.deliveryArea && state.cart.deliveryArea === "international" && state.cart.meals.length >= 1) {
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


export const citySelector = (state: RootState) => state.cart.deliveryArea;

export const shippingAddressSelector = (state: RootState) => state.cart.deliveryAddress;
export const deliveryDateSelector = (state: RootState) => state.cart.deliveryDate;
export const deliveryTimeSelector = (state: RootState) => state.cart.deliveryTime;

export const { addMeal,updateMealState,  incrementOrderQuantity, decrementOrderQuantity, removeMeal,updateDate,updateTime, updateCity, updateShippingAddress, clearCart,selectMeal,deselectMeal,toggleSelectAllMeals,allClearCart} =
    cartSlice.actions;

export default cartSlice.reducer;
