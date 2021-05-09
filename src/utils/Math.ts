
export const calcTotalCost = (lineItems: any) => {
  let cartTotal = 0

  lineItems?.forEach((item: any) => 
  {cartTotal = (Number(item.variant.price) * item.quantity) + cartTotal})

  return cartTotal.toFixed(2)
}

export const countTotalItems = (lineItems: any) => {
  let totalItems = 0;

  lineItems?.forEach((item: any) => totalItems = item.quantity + totalItems)

  return totalItems > 0 ? totalItems : 'Empty Cart';
};  
