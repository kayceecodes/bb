import { ICartItems } from "../../types/interfaces";
import * as actionTypes from "../actions/actionTypes";

export interface ICart {
  cartTotal: number;
  cartItems: ICartItems[];
}

export const initialState: ICart = {
  cartTotal: 0,
  cartItems: [
    // {
    //   name: "Bracelet Example Number 1",
    //   quantity: 2,
    //   size: 5.5,
    //   price: 13.85,
    //   src: '../../../public/images/bracelets/bracelet1.jpg',
    //   id: "0000d",
    // },
    // {
    //   name: "Bracelet Example Number 1",
    //   quantity: 2,
    //   size: 5.5,
    //   price: 13.85,
    //   src: '../../../public/images/bracelets/bracelet1.jpg',
    //   id: "0000d",
    // },
  ],
};

const cart_reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cartTotal: parseFloat(
          (
            action.cartItems.quantity * action.cartItems.price +
            state.cartTotal
          ).toFixed(2)
        ),
        cartItems: state.cartItems.concat(action.cartItems),
      };
    case actionTypes.CLEAR_ID_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => action.removedItem.id !== item.id
        ),
      };
    case actionTypes.REMOVE_ALL_QUANTITY_FROM_ITEM:
      return {
        ...state,
        cartTotal: Math.abs(
          state.cartTotal - action.newItem.quantity * action.newItem.price
        ),
        cartItems: state.cartItems.map((item, i) => {
          if (action.newItem.id === item.id) {
            /*if there's an id that matches, remove quantities and return the item object back to cartItems */
            state.cartItems[i].quantity = 0;
            return item;
          } else {
            /* Always return an item back into cartItems */
            return item;
          }
        }),
      };
    case actionTypes.ADD_QUANTITY_TO_ITEM:
      return {
        ...state,
        cartTotal:
          action.newItem.quantity * action.newItem.price + state.cartTotal,
        cartItems: state.cartItems.map((item, i) => {
          if (action.newItem.id === item.id) {
            /*if there's an id that matches, add quantities and return the item object back to cartItems */
            state.cartItems[i].quantity =
              item.quantity + action.newItem.quantity;
            return item;
          } else {
            /* Always return an item back into cartItems */
            return item;
          }
        }),
      };
    case actionTypes.REMOVE_QUANTITY_FROM_ITEM:
      return {
        ...state,
        cartTotal: Math.abs(
          state.cartTotal - action.newItem.quantity * action.newItem.price
        ),
        cartItems: state.cartItems.map((item, i) => {
          if (action.newItem.id === item.id) {
            /*if there's an id that matches, add subtract from total and return the item object back to cartItems */
            state.cartItems[i].quantity =
              item.quantity - action.newItem.quantity;
            return item;
          } else {
            /* Always return an item back into cartItems */
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

export default cart_reducer;
