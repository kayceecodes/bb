import React, { CSSProperties, useContext, useState } from "react";

import {
  IBraceletData,
  PageAnimations,
  Motions,
  ICartItems,
} from "../../src/types/interfaces";
import { MouseEvent } from "../../src/types/aliases"; // TYPE - Events

import Client, { Collection, Product as ProductData } from "shopify-buy";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addToCart, addQuantityToItem } from "../../src/store/actions";

import CartSummaryModal from "../../src/ui/cartSummaryModal/CartSummaryModal";
import { ShopContext } from "../../src/context/ShopContext";
import ProductInput from "../../src/components/forms/ProductInput";
import ProductHeader from "../../src/ui/productHeader/ProductHeader";
import BtnAddToCart from "../../src/ui/btnAddToCart/BtnAddToCart";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "../../src/ui/hoc/Grid";
import PageTransition from "../../src/ui/hoc/PageTransition";

export const getStaticPaths: GetStaticPaths = async () => {
  let productsData: Promise<Collection[] | ProductData[]> = Client.buildClient({
    domain: "benson-bracelets.myshopify.com",
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN as string
  })
    .product.fetchAll()
    .then((products) => {
      return products;
    });

  return {
    paths: (await productsData).map((product: any) => ({
      params: { slug: product.handle },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  /* ? What is being passed into context parameter? */
  let { params } = context;

  let product = await Client.buildClient({
    domain: "benson-bracelets.myshopify.com",
    storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN as string
  })
  .product.fetchByHandle(params?.slug as string)
  .then((res) => res)
  
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};

interface IDisplayItemProps {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  pageStyle: CSSProperties;
  pageAnimations: PageAnimations;
  motions: Motions;
  addToCart?: (cartItems: ICartItems) => any;
}

interface IGlobalState {
  cartItems: ICartItems[];
}

// type aProps = IDisplayItemProps & IBraceletData & IGlobalState;

interface Props extends IDisplayItemProps, IBraceletData, IGlobalState {
  product: ProductData & {productType: string}
}

const useStyles = makeStyles((theme) => ({
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "15px",
    },
  },

  itemImg: {
    width: "160px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  goToCartBtn: {
    marginTop: "5px",
    fontSize: "0.6rem",
    textTransform: "none",
    color: theme.palette.common.slateTan,
  },
  itemDescription: {
    maxWidth: 180,
    textAlign: "right",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 270,
    },
  },
  outlined: {
    color: theme.palette.common.dimegray,
  },
}));

function Product(props: Props) {
  const { addItemToCheckout } = useContext<any>(ShopContext);
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [loading, setLoading] = React.useState(false);
  const [variantId, setVariantId] = useState('')
  const [values, setValues] = React.useState<ICartItems>({
    name: "Not Yet Updated",
    size: 0,
    quantity: 1,
    price: 0,
    src: "",
    id: "",
  });

  const handleChange = (prop: keyof ICartItems, event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /** Map through ids in CartItems then checks if it includes the called id
   *  @param newItem {ICartItems}
   *  @returns {void}
   */
  const onAddToCart = (newItem: ICartItems) => {
    const item = {
      ...newItem,
      id: variantId,
      name: props.product.title,
      price: props.product.variants[0].price,
      src: props.product.images[0].src,
    };
  
    /*Pull all current ids in cartItems into 'const ids' */
    const ids = props.cartItems.map((cartItem: any) => cartItem.id);

    /*Add quantities through dispatch(addQty) only if ids match, 
    if not then dispatch(addToCart) for a new item with a different size */
    ids.includes(item.id)
      ? dispatch(addQuantityToItem(item))
      : dispatch(addToCart(item));
  };

React.useEffect(() => {
console.log('VariantId chosen in ProductInput: ', variantId)
}, [variantId])
  /* Clears values in the options */
  const clearValues = () =>
    setValues({
      name: "",
      size: 0,
      quantity: 1,
      price: 0,
      src: "",
      id: "",
    });

  const loadCartSummary = (e: MouseEvent) => {
    setAnchorEl(e.currentTarget);
    setLoading(true);/* Button will show Circlular Progress */
    setTimeout(() => setLoading(false), 500);
    setTimeout(() => setOpen(true), 500);
  };

  if (!props.product.title)
    return (
      <div style={{ position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress color="primary" />
      </div>
    );
  return (
    <div>
      <div style={{ position: "relative" }}>
          <PageTransition pageStyle={props.pageStyle} pageAnimations={props.pageAnimations}>
          <CartSummaryModal
            title={props.product.title}
            image={props.product.images[0].src}
            quantity={values.quantity}
            price={props.product.variants[0].price}
            setValue={props.setValue}
            anchorEl={anchorEl}
            open={open}
            setOpen={setOpen}
            clearValues={clearValues}
          />
          <Grid container alignItems="center" direction="column">
            <div className={classes.sectionMargin} />
            <Grid item style={{ flexGrow: 1 }} xs={12}>
              <ProductHeader title={props.product.title} />
            </Grid>
            <div className={classes.sectionMargin} />
            {/*Separate Name from item's img and details*/}
            <Grid item>
              {/* Second Item in the main container of Displayitem component - img left & details/options right */}
              <Grid container direction="row" alignItems="center">
                <Grid item sm={6}>
                  {/* LEFT SIDE OF ITEM - Img Of Bracelet */}
                  <img
                    src={props.product.images[0].src}
                    className={classes.itemImg}
                    alt="bracelet displayed"
                  />
                  {/* Img Of Item - Bracelet */}
                </Grid>
                <Grid item sm={4}>
                  {/* RIGHT SIDE OF ITEM - Details/Options */}              
                  <Container
                    alignItems="flex-end"
                    justify="space-around"
                    direction="column">
                    {/* SIZE - CHOOSE SIZE*/}
                      <ProductInput
                        values={values}
                        handleChange={handleChange}
                        inputType="size"
                        product={props.product}
                        setVariantId={setVariantId}
                      />
                      <ProductInput
                        values={values}
                        handleChange={handleChange}
                        inputType="quantity"
                        product={props.product}
                        setVariantId={setVariantId}
                      />
                      <BtnAddToCart
                        addItemToCheckout={addItemToCheckout}
                        variantId={variantId}
                        onAddToCart={onAddToCart}
                        setLoading={setLoading}
                        loading={loading}
                        loadCartSummary={loadCartSummary}
                        product={props.product}
                        values={values}
                      />
                    {/* PRICE - CALCULATED */}
                      <Typography variant="body1" style={{ paddingTop: "10px" }}>
                        Price:{" "}
                        <span data-testid="price">
                          {props.product.variants[0].price}
                        </span>
                      </Typography>
                    <div className={classes.sectionMargin} />
                      <Typography variant="h5">
                        {props.product.productType}
                      </Typography>
                        <Typography
                          className={classes.itemDescription}
                          variant="body1"
                        >
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Voluptatibus ullam, ipsum deleniti asperiores
                          dignissimos harum? Totam, provident sed.
                        </Typography>
                      </Container>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </PageTransition>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(Product);
