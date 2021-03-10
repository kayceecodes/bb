import React, { Component } from "react";
import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: "benson-bracelets.myshopify.com",
  // storefrontAccessToken: "69542136315009d67e27c9e7ffed55f2",
  storefrontAccessToken: "758288766eaaa7b97312e1cc75662bd2"
});

const ShopContext = React.createContext({}); // ??? default Values Need to be figured out

interface State {
  product: {};
  products: Array<any>;
  checkout: any;
  isCartOpen: boolean;
  isMenuOpen: boolean;
  productHandle: string;
}

export class ShopPrivder extends Component {
  state: State = {
    product: {},
    products: [],
    checkout: {},
    isCartOpen: false,
    isMenuOpen: false,
    productHandle: "",
  };

  componentDidMount() {
    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id);
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

  /**
   * @param variantId
   * @param quantity
   * @param size
   */
  addItemToCheckout = async (
    variantId: string,
    quantity: string,
    size: string,
    category: string
  ) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
        customAttributes: [
          { key: "Size", value: size },
          { key: "Category", value: category },
        ],
      },
    ];
    const checkout = await client.checkout.addLineItems(
      this.state.checkout.id,
      lineItemsToAdd
    );
    this.setState({ checkout: checkout });

    //Open cart whenever new lineItems been added
    this.openCart();
  };

  removeLineItem = async (lineItemIdsToRemove: any) => {
    // let currentId = this.state.checkout.id
    client.checkout
      .removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
      .then((checkout) => {
        this.setState({ checkout: checkout });
      });
  };

  fetchAllProducts = async () => {
    // Fetch all products in your shop
    await client.product.fetchAll().then((products) => {
      this.setState({ products });
    });
  };

  fetchProductWithHandle = async (handle: any) => {
    const product = await client.product.fetchByHandle(handle);
    this.setState({ product: product });
  };

  setHandle = async (productHandle: string) => {
    this.setState({ productHandle });
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };

  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  render() {
    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchAllProducts: this.fetchAllProducts,
          fetchProductWithHandle: this.fetchProductWithHandle,
          setHandle: this.setHandle,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem,
          closeCart: this.closeCart,
          openCart: this.openCart,

          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopPrivder;
