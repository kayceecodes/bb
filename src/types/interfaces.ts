import { Variants, Transition } from "framer-motion"

export interface PageAnimations {
  variants: Variants
  transition: Transition
}

export interface Motions {
  initial: string
  animate: string
  exit: string
}

export interface IBraceletData {
  name: string
  price: number
  src: string
  category: string
  id?: number
}

export interface ICartItems {
      name: string
      quantity: number
      size: number
      price: string | number
      src: string
      id: string | number
}[]
