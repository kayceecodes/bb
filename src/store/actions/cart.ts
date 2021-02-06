import { ICartItems } from '../../types/interfaces'
import * as actionTypes from './actionTypes'

export interface AddToCart {
    type: actionTypes.ADD_TO_CART
    payload: ICartItems
}
export interface ClearIDFromCart {
    totalPriceRemoved: number
    id: number
    type: actionTypes.CLEAR_ID_FROM_CART
}

export interface RemoveAllQuantityFromItem {
  type: actionTypes.REMOVE_QUANTITY_FROM_ITEM
  payload: ICartItems
} 

export interface AddQuantityToItem {
  type: actionTypes.ADD_QUANTITY_TO_ITEM
  payload: ICartItems
} 

export interface RemoveQuantityFromItem {
  type: actionTypes.REMOVE_QUANTITY_FROM_ITEM
  payload: ICartItems
} 

export type CartAction = AddToCart | ClearIDFromCart | AddQuantityToItem

/**
 * addToCart - Adds 1 object. CartItems, which is an array of objects. 
 * @param cartItems 
 * @returns {cartItems}
 */
export const addToCart = (cartItems: any) => {
  return {
      type: actionTypes.ADD_TO_CART,
      cartItems: cartItems,
  }
}

/**
 * clearIdFromCart - Removes an item from cartItems, an object from an array. It uses id to identity and remove the whole object element from the array. 
 * @param removedItem 
 * @returns {removedItem}
 */
export const clearIDFromCart = (removedItem: ICartItems) => {
  return {
    type: actionTypes.CLEAR_ID_FROM_CART,
    removedItem,
  }
}
export const removeAllQuantityFromItem = (newItem: ICartItems) => {
  return {
    type: actionTypes.REMOVE_ALL_QUANTITY_FROM_ITEM,
    newItem,
  }
}
/**
 * addQuantityToItem - goes through array cartItems and compares ids to find the right item to add quantity from newItem's quantity to cartItems[index] quantity
 * @param newItem
 * @returns {newItem}
*/
export const addQuantityToItem = (newItem: ICartItems) => {
  return {
    type: actionTypes.ADD_QUANTITY_TO_ITEM,
    newItem,
  }
}

export const removeQuantityFromItem = (newItem: ICartItems) => {
  return {
    type: actionTypes.REMOVE_QUANTITY_FROM_ITEM,
    newItem,
  }
}