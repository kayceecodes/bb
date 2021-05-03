import React from "react"

import { render } from "./test-utils"
import Shoppingcart from "../../pages/shoppingcart"
import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
// import ShopContext, {ShopConsumer, ShopProvider} from '../components/context/ShopContext'

type ShoppingcartProps = React.ComponentProps<typeof Shoppingcart>

const baseProps: ShoppingcartProps = {    
    pageStyle: {},
    pageAnimations: { transition: {}, variants: {} },
    motions: { animate: "", initial: "", exit: "" },
  }


  const renderUI = (props: Partial<ShoppingcartProps>) =>
    render(<Shoppingcart {...baseProps} {...props} />, {})
  
    describe('When remove item button is clicked', () => {


        beforeAll(() => {
            /*Click on specific card-close-button based on it's information*/ 
        })

        test('reduce cart Total to accurate amount', () => {

        })

        test('Properly remove and clear items from list of items', () => {
            
            // expect(screen.getByTestId('remove-item-btn')).not.toBeInTheDocument()
        })
    })