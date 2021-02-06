import React, { Component } from "react";
import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: 'benson-bracelets.myshopify.com',
  storefrontAccessToken: '69542136315009d67e27c9e7ffed55f2',
});

const ShopContext = React.createContext({}); // ??? default Values Need to be figured out

interface State {
  product: {}
  products: Array<any>
  checkout: any
  isCartOpen: boolean
  isMenuOpen: boolean
}
 
export class ShopPrivder extends Component {
  state: State = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
  };

  componentDidMount() {
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id)
    } else {
      this.createCheckout();
    }
  }

  /**
   *  Local storage will hold the  checkoutid.
   *  Shopify will handle the check eachtime a checkout is started.
   * @memberOf ShopPrivder
   */
  createCheckout = async () => {
    const checkout = await client.checkout.create();
    localStorage.setItem("checkout_id", checkout.id as any); // ??? Potentail Type Error in checkout object
    this.setState({ checkout: checkout });
  };
  /**
   * Fetch stored checkout from localStorage
   * @memberOf ShopPrivder
   */
  fetchCheckout = (checkoutId: any) => {
    client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      })
      .catch((err) => {
        console.log("Error Message, in ShopContext fetchCheckout: ", err);
      });
  };
// checkout id Z2lkOi8vc2hvcGlmeS9DaGVja291dC8yOGVhZmQwM2Q1OTk5MmY4MWRlZWRmZDRlYTU5YzEwYz9rZXk9YjM3Njc2NWVhMjRjMzc0NDNlZTExMzQ2ZGY2NzdhNjQ=
  /** Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNzk0MDIzMjIyNDkzOQ blue
   *  'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zNzk0MDIzMjE5MjE3MQ==' yellow
   *  Z2lkOi8vc2hvcGlmeS9DaGVja291dExpbmVJdGVtLzM3OTQwMjMxOTk1NTYzMD9jaGVja291dD0yOGVhZmQwM2Q1OTk5MmY4MWRlZWRmZDRlYTU5YzEwYw
   * Create LineItemToAdd which will be add to checkout only
   * if checkout object is not null
   * @param variantId 
   * @param quantity 
   * @param size 
   */
  addItemToCheckout = async (variantId: string, quantity: string, size: string) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
        customAttributes: [{key: "size", value: size}]
      }
    ]
      const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
      this.setState({ checkout: checkout})

      //Open cart whenever new lineItems been added
      this.openCart();
  };

  removeLineItem = async (lineItemIdsToRemove: any) => {
    // let currentId = this.state.checkout.id
    client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
    .then((checkout) => {
    this.setState({checkout: checkout})
    })
  };

  //  http://shopify.github.io/js-buy-sdk/ - Under 'Fetching Products'
  fetchAllProducts = async () => {
    // Fetch all products in your shop
    client.product.fetchAll().then((products) => {
      this.setState({ products });
    });
  };

  fetchProductWithHandle = async (handle: any) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });
  };

  closeCart = () => { this.setState({isCartOpen: false})};

  openCart = () => { this.setState({isCartOpen: true})};

  closeMenu = () => { this.setState({ isMenuOpen: false })};

  openMenu = () => { this.setState({ isMenuOpen: true})};

  render() {
    return (
      <ShopContext.Provider 
      value={{ 
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeCart: this.closeCart,
          openCart: this.openCart,

          closeMenu: this.closeMenu,
          openMenu: this.openMenu
           }}>
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopPrivder;
