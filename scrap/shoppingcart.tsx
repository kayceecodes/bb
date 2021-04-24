import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import { motion, MotionStyle } from "framer-motion";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

import { IPageAnimations, IMotions, ICartItems } from "../src/types/interfaces";
import Item from "../src/components/shoppingcart/item/Item";

import { ICart } from "../src/store/reducers/cart_reducer";
import Button from "@material-ui/core/Button/Button";
import Link from "../src/Link";
import { ShopContext } from "../src/components/context/ShopContext";

interface IProps {
  pageStyle: MotionStyle;
  pageAnimations: IPageAnimations;
  motions: IMotions;
  cartItems: ICartItems[];
  cartTotal: number;
}
const useStyles = makeStyles((theme) => ({
  root: {},
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "35px",
    },
  },
  heightOfContainer: {
    height: "100%",
  },
  header: {
    borderBottom: `3px solid ${theme.palette.common.antiqueWhite}`,
    padding: "0px 30px 5px",
    width: "100px",
    textAlign: "center",
    margin: "0 auto 70px",
  },
  shoppingcartContainer: {
    width: "95%",
    margin: "0px auto",
    maxWidth: "1150px",
    [theme.breakpoints.up("lg")]: {
      width: "85%",
    },
  },
  totalItems: {
    textAlign: "left",
    fontFamily: "Nunito",
    color: "rgba(54, 68, 92, 1)",
  },
  scrollOverflow: {
    overflow: "auto",
    height: "350px",
    marginTop: "20px",
    marginBottom: "60px",
    paddingRight: "10px",
    paddingLeft: "10px",
    border: `1px solid ${theme.palette.common.dimegray}10`,
    backgroundColor: theme.palette.common.offWhite,
    borderRadius: "4px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
  },
  absolutePos: {
    position: "absolute",
    right: "30px",
    top: 0,
  },
  bottomBorder: {
    marginTop: "25px",
    border: `0.5px solid ${theme.palette.common.orange}`,
    width: "280px",
    margin: "0 auto",
    [theme.breakpoints.up("sm")]: {
      width: "450px",
    },
  },
  checkoutBtn: {
    color: theme.palette.common.dimGray,
    font: "0.8rem Raleway",
    textTransform: "none",
    letterSpacing: "0.5px",
    padding: "12px 25px",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    border: `0.5px solid ${theme.palette.common.slateTan}99`,
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.common.orange,
    },
  },
}));

/* Container with hidden overflow for items in cart */
const ItemsList = (props: any) => {
  const classes = useStyles();
  return (
    <div className={classes.scrollOverflow}>
      {props.cartItems.length > 0 ? (
        props.cartItems.map((item: ICartItems, index: number) => (
          <Item
            key={item.name + item.size + index}
            getQtyTotal={props.getQtyTotal}
            name={item.name}
            quantity={item.quantity}
            size={item.size}
            price={item.price}
            src={item.src}
            id={item.id}
          />
        ))) : <span className={classes.totalItems}>Your Cart Is Empty</span>}
    </div>
  );
};

const Stats = (props: any) => (
  <>
    {"Cart Total: $" + props.cartTotal.toFixed(2)}
    <br />
    {"Total Items in Cart: "}
    <span data-testid="cart-total-qty">{props.numberOfItems}</span>
    {" items"}
  </>
);
const Shoppingcart = (props: IProps) => {
  const { checkout } = useContext<any>(ShopContext);
  const classes = useStyles();
  const theme = useTheme();
  let [numberOfItems, setNumberOfItems] = useState(0);
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  }; // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles

  const getQtyTotal = () => {
    numberOfItems = 0;

    for (let obj of props.cartItems) {
      numberOfItems += obj.quantity;
    }
    setNumberOfItems(numberOfItems);
  };

  useEffect(() => {
    getQtyTotal();
  });

  return (
    <motion.div
      className={matches.md ? classes.heightOfContainer : ""}
      style={props.pageStyle}
      initial={props.motions.initial}
      animate={props.motions.animate}
      exit={props.motions.exit}
      variants={props.pageAnimations.variants}
      transition={props.pageAnimations.transition}
    >
      <div className={classes.sectionMargin} />
      <Grid container justify="center" className={classes.header}>
        <Typography variant="h2">Cart</Typography>
      </Grid>
      <div className={classes.sectionMargin} />

      <Grid
        container
        justify="space-around"
        alignItems="flex-start"
        className={classes.shoppingcartContainer}
        style={{ position: "relative" }}
      >
        <Grid item xs={12} md={6}>
          <Grid
            container
            direction="column"
            justify="space-around"
            alignItems="center"
            spacing={4}
          >
            <Grid
              item
              className={classes.totalItems}
              style={{ textAlign: "left" }}
            >
              <Stats
                cartTotal={props.cartTotal}
                numberOfItems={numberOfItems}
              />
            </Grid>
            <div className={classes.bottomBorder} />
            <Grid item xs={12} style={{ width: "100%" }}>
              <ItemsList
                cartItems={props.cartItems}
                getQtyTotal={getQtyTotal}
              />
            </Grid>
            <Grid item>
              <Button
                component={Link}
                href={checkout.webUrl ? checkout.webUrl : "/"}
                className={classes.checkoutBtn}
              >
                Continue To Checkout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  );
};

export default connect((state: { cart: ICart }) => ({
  cartItems: state.cart.cartItems,
  cartTotal: state.cart.cartTotal,
}))(Shoppingcart);
