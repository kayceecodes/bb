import { ICartItems } from "../types/interfaces";

export const getTotalItems = (cartItems: ICartItems[]) => {
    let totalItemsInCart = 0;
  
    for (let item in cartItems) {
      totalItemsInCart += cartItems[item].quantity;
    }
    return totalItemsInCart;
  };