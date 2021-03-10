import { useRouter } from "next/router";
import React, { CSSProperties, useContext, useEffect, useState } from "react";

import {
  IBraceletData,
  IPageAnimations,
  IMotions,
  ICartItems,
} from "../../src/types/interfaces";
import { MouseEvent } from "../../src/types/aliases"; // TYPE - Events

import Client from "shopify-buy";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import { motion } from "framer-motion";

import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addToCart, addQuantityToItem } from "../../src/store/actions";

import CartSummaryModal from "../../src/ui/cartSummaryModal/CartSummaryModal";
import { ShopContext } from "../../src/components/context/ShopContext";
import ProductInput from "../../src/components/forms/ProductInput";
import ProductHeader from "../../src/ui/productHeader/ProductHeader";
import BtnAddToCart from "../../src/ui/btnAddToCart/BtnAddToCart";

interface IDisplayItemProps {
  setValue: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  pageStyle: CSSProperties;
  pageAnimations: IPageAnimations;
  motions: IMotions;
  addToCart?: (cartItems: ICartItems) => any;
}

interface IGlobalState {
  cartItems: ICartItems[];
}

type IProps = IDisplayItemProps & IBraceletData & IGlobalState;

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

function Product(props: IProps) {
  const { product, products, addItemToCheckout } = useContext<any>(ShopContext);
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [productData, setProductData] = useState<typeof product>({});
  const router = useRouter();
  const handle = router.asPath.substring(13);
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<ICartItems>({
    name: 'Not Yet Updated',
    size: 0,
    quantity: 1,
    price: 0,
    src: '',
    id: "",
  });

  const handleChange = (prop: keyof ICartItems, event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /** Map through ids in CartItems then checks if it includes the called id
   *  @param newItem
   *  @returns {void}
   */
  const onAddToCart = (newItem: ICartItems) => {
    newItem = {
      ...newItem,
      id:
        values.name +
        values.size /*JS automatically adds as if size is a string */,
    };
    /*Pull all current ids in cartItems*/
    const ids = props.cartItems.map((item) => item.id);

    /*Add quantities through dispatch(addQty) only if ids match, 
    if not then dispatch(addToCart) for a new item with a different size */
    ids.includes(newItem.id)
      ? dispatch(addQuantityToItem(newItem))
      : dispatch(addToCart(newItem));
  };

  /* Clears values in the options */
  const clearValues = () =>
    setValues({
      name: "Cleared",
      size: 0,
      quantity: 1,
      price: 0,
      src: "Cleared",
      id: "Cleared",
    });

  const loadCartSummary = (e: MouseEvent) => {
    setAnchorEl(e.currentTarget);
    setLoading(true)
    setTimeout(() => setLoading(false), 500);
    setTimeout(() => setOpen(true), 500);
  };

  useEffect(() => {
      Client.buildClient({
        domain: "benson-bracelets.myshopify.com",
        storefrontAccessToken: "758288766eaaa7b97312e1cc75662bd2",
      })
        .product.fetchByHandle(handle)
        .then((res) => {
          console.log("Response: ", res);
          setProductData(res);
          setValues({
            ...values,
            name: res.title,
            price: parseInt(res.variants[0].price),
            src: res.images[0].src
          })
        })
  }, [handle]);

  if (!productData.title)
    return (
      <div style={{position: 'absolute', top: '50%', left: '50%'}}>
        <CircularProgress color="primary" />
      </div>
    )
  return (
    <div>
      <div style={{ position: "relative" }}>
        <motion.div
          style={{
            position: "absolute",
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
          }} // Style of the page as a container
          initial={props.motions.initial}
          animate={props.motions.animate}
          exit={props.motions.exit}
          variants={props.pageAnimations.variants} //pageAnimations obj broken up to 2 nested objs, variant & transitions
          transition={props.pageAnimations.transition}
        >
          <CartSummaryModal
            setValue={props.setValue}
            anchorEl={anchorEl}
            item={values}
            open={open}
            setOpen={setOpen}
            clearValues={clearValues}
          />
          <Grid container alignItems="center" direction="column">
            <div className={classes.sectionMargin} />
            <Grid item style={{ flexGrow: 1 }} xs={12}>
              <ProductHeader title={productData.title} />
            </Grid>
            <div className={classes.sectionMargin} />
            {/*Separate Name from item's img and details*/}
            <Grid item>
              {/* Second Item in the main container of Displayitem component - img left & details/options right */}
              <Grid container direction="row" alignItems="center">
                <Grid item sm={6}>
                  {/* LEFT SIDE OF ITEM - Img Of Bracelet */}
                  <img
                    src={productData.images[0].src}
                    className={classes.itemImg}
                    alt="bracelet displayed"
                  />
                  {/* Img Of Item - Bracelet */}
                </Grid>
                <Grid item sm={4}>
                  {/* RIGHT SIDE OF ITEM - Details/Options */}
                  <Grid
                    container
                    alignItems="flex-end"
                    justify="space-around"
                    direction="column"
                  >
                    {/* SIZE - CHOOSE SIZE*/}
                    <Grid item>
                      <ProductInput
                        values={values}
                        handleChange={handleChange}
                        inputType="size"
                      />
                    </Grid>
                    <Grid item>
                      <ProductInput
                        values={values}
                        handleChange={handleChange}
                        inputType="quantity"
                      />
                    </Grid>
                    {/* SHOPPING CART - BTN - ADD TO CART FUNCTION
                      ADDS CART ITEMS TO REDUCER
                  */}

                    <Grid item>
                      <BtnAddToCart
                        addItemToCheckout={addItemToCheckout}
                        onAddToCart={onAddToCart}
                        setLoading={setLoading}
                        loading={loading}
                        loadCartSummary={loadCartSummary}
                        productData={productData}
                        values={values}
                      />
                    </Grid>
                    {/* PRICE - CALCULATED */}
                    <Grid item style={{ paddingTop: "10px" }}>
                      <Typography variant="body1">
                        Price:{" "}
                        <span data-testid="price">
                          {productData.variants[0].price}
                        </span>
                      </Typography>
                    </Grid>
                    <div className={classes.sectionMargin} />
                    <Grid item>
                      <Typography variant="h5">
                        {productData.options[1].values[0].value}
                      </Typography>
                    </Grid>
                    <Grid container justify="flex-end">
                      <Grid item xs={12}>
                        <Typography
                          className={classes.itemDescription}
                          variant="body1"
                        >
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Voluptatibus ullam, ipsum deleniti asperiores
                          dignissimos harum? Totam, provident sed.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(Product);
