import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TMealsForm } from "@/types/meals";

export interface CartMeal extends TMealsForm {
    orderQuantity: number;
}

interface InitialState {
    meals: CartMeal[];
    city: string;
    shippingAddress: string;
    mealProviderId: string | null; // Track which restaurant the meals are from
}

const initialState: InitialState = {
    meals: [],
    city: "",
    shippingAddress: "",
    mealProviderId: null,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addMeal: (state, action) => {
            const { _id, mealProviderId } = action.payload;

            // If cart is not empty and restaurantId is different, clear cart before adding
            if (state.meals.length > 0 && state.mealProviderId !== mealProviderId) {
                state.meals = []; // Clear previous meals
                state.mealProviderId = mealProviderId; // Set new restaurant
            }

            const mealToAdd = state.meals.find((meal) => meal._id === _id);

            if (mealToAdd) {
                mealToAdd.orderQuantity += 1;
            } else {
                state.meals.push({ ...action.payload, orderQuantity: 1 });
                state.mealProviderId =mealProviderId; // Set restaurant when first meal is added
            }
        },

        incrementOrderQuantity: (state, action) => {
            const mealToIncrement = state.meals.find((meal) => meal._id === action.payload);
            if (mealToIncrement) {
                mealToIncrement.orderQuantity += 1;
            }
        },

        decrementOrderQuantity: (state, action) => {
            const mealToDecrement = state.meals.find((meal) => meal._id === action.payload);
            if (mealToDecrement && mealToDecrement.orderQuantity > 1) {
                mealToDecrement.orderQuantity -= 1;
            }
        },

        removeMeal: (state, action) => {
            state.meals = state.meals.filter((meal) => meal._id !== action.payload);
            if (state.meals.length === 0) {
                state.mealProviderId = null; // Reset restaurant if cart is empty
            }
        },

        updateCity: (state, action) => {
            state.city = action.payload;
        },

        updateShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },

        clearCart: (state) => {
            state.meals = [];
            state.city = "";
            state.shippingAddress = "";
            state.mealProviderId= null;
        },
    },
});

export const orderedMealSelector = (state: RootState) => state.cart.meals;

export const orderedSelector = (state: RootState) => ({
    meals: state.cart.meals.map((meal) => ({
        meal: meal._id,
        quantity: meal.orderQuantity,
        color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress} - ${state.cart.city}`,
    paymentMethod: "Online",
});

export const shippingCostSelector = (state: RootState) => {
    if (state.cart.city && state.cart.city === "Dhaka" && state.cart.meals.length > 1) {
        return 60;
    } else if (state.cart.city && state.cart.city !== "Dhaka" && state.cart.meals.length > 1) {
        return 120;
    } else {
        return 0;
    }
};

export const subTotalSelector = (state: RootState) =>
    state.cart.meals.reduce((acc, meal) => {
        return acc + (meal.offerPrice ?? meal.price) * meal.orderQuantity;
    }, 0);

export const grandTotalSelector = (state: RootState) => subTotalSelector(state) + shippingCostSelector(state);

export const citySelector = (state: RootState) => state.cart.city;

export const shippingAddressSelector = (state: RootState) => state.cart.shippingAddress;

export const { addMeal, incrementOrderQuantity, decrementOrderQuantity, removeMeal, updateCity, updateShippingAddress, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
