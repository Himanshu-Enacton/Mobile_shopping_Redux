import type { CartItem, Item } from "../Products";
import { ADD_TO_CART, REMOVE_TO_CART, RESET_ALL } from "./constants";

const initialState: CartItem[] = [];

export const reducer = (state = initialState, action: any): CartItem[] => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.find(item => item.id === action.data.id);

      if (existingItem) {
        return state.map(item =>
          item.id === action.data.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...(action.data as Item), quantity: 1 }];
    }
    case REMOVE_TO_CART:
      return state.flatMap(item => {
        if (item.id !== action.data) {
          return [item];
        }

        return item.quantity > 1
          ? [{ ...item, quantity: item.quantity - 1 }]
          : [];
      })
    case RESET_ALL:
       state = [];
       return state;
    default:
      return state;
  }
};