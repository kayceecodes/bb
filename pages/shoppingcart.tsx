import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";

import makeStyles from "@material-ui/core/styles/makeStyles";

import { PageAnimations, Motions, ICartItems } from "../src/types/interfaces";
import Item from "../src/components/shoppingcart/item/Item";

import { ICart } from "../src/store/reducers/cart_reducer";
import Button from "@material-ui/core/Button/Button";
import Link from "../src/Link";

import PageTransition from "../src/ui/hoc/PageTransition";
import Grid from "../src/ui/hoc/Grid";
import { calcTotalCost, countTotalItems } from "../src/utils/Math";
import { CSSProperties } from "@material-ui/styles";
import TitleHeader from "../src/ui/titleHeader/TitleHeader";

import Client from "shopify-buy";
import { ShopContext } from "../src/context/ShopContext";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

interface IProps {
  pageStyle: CSSProperties;
  pageAnimations: PageAnimations;
  motions: Motions;
  cartItems: ICartItems[];
  cartTotal: number;
}

const useStyles = makeStyles((theme) => ({
  circularProgressWrapper: {
    margin: '80px auto 0px'
  },
  header: {
    padding: "0px 30px 5px",
    width: "100px",
    textAlign: "center",
    margin: "40px auto",
    [theme.breakpoints.up("lg")]: {
      margin: "75px auto 40px",
    },
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
    fontFamily: "Nunito",
    color: "#36445c",
    borderBottom: "2px solid #ffa225",
    padding: "20px 70px 30px",
  },
  itemsList: {
    overflow: "auto",
    height: "350px",
    minWidth: "350px",
    marginTop: "20px",
    marginBottom: "60px",
    paddingRight: "10px",
    paddingLeft: "10px",
    textAlign: "center",
    border: `0.5px solid ${theme.palette.common.slateTan}99`,
    backgroundColor: theme.palette.common.offWhite,
    borderRadius: "4px",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.07)",
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
  text: {
    fontFamily: "Nunito",
    color: "#36445c"
  }
}));

/* Container with hidden overflow for items in cart */
/* Container with hidden overflow for items in cart */
const ItemsList = (props: any) => {
  const classes = useStyles();
  
  return (
    <div className={classes.itemsList}>
      {props.lineItems?.length > 0 ? (
        props.lineItems.map((item: any, index: number, lineItems: any) => (
          <Item
            key={item.title + item.size + index}
            countTotalItems={props.countTotalItems}
            name={item.title}
            quantity={item.quantity}
            size={item.variant.title.split(' /')[0]}
            price={item.variant.price}
            src={item.variant.image.src}
            id={item.id}
          />
        ))
      ) : <span className={classes.text}>Your Cart Is Empty</span>}
    </div>
  );
};

const Stats = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.totalItems}>
      {"Cart Total: $" + calcTotalCost(props.lineItems)}
      <br />
      {"Total Items in Cart: " + countTotalItems(props.lineItems)}
    </div>
  );
};
 
function Shoppingcart (props: IProps): React.ReactElement {
  const { checkout } = useContext<any>(ShopContext);
  const classes = useStyles();

  return (
    <PageTransition pageStyle={props.pageStyle} pageAnimations={props.pageAnimations}>
      <div className={classes.header}>
      <TitleHeader header='Cart' />
      </div>
        <Grid
          direction="column"
          justify="space-around"
          alignItems="center"
          xs={12}>
            <Stats 
            lineItems={checkout.lineItems}
             />
            <ItemsList
              lineItems={checkout.lineItems}
              countTotalItems={countTotalItems}              
            />
            <Button
              disabled={checkout.lineItems === 0}
              component={Link}
              href={checkout.webUrl ? checkout.webUrl : "/"}
              className={classes.checkoutBtn}
            >
              Continue To Checkout
            </Button>
        </Grid>
    </PageTransition>
  );
};

export default connect((state: { cart: ICart }) => ({
  cartItems: state.cart.cartItems,
  cartTotal: state.cart.cartTotal,
}))(Shoppingcart);
