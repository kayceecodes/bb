import { Variants, Transition } from "framer-motion"

export interface IPageAnimations {
  variants: Variants
  transition: Transition
}

export interface IMotions {
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
      price: number
      src: string
      id: any
}[]
