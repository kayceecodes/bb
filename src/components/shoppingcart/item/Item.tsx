import React, { Dispatch, useEffect, useState } from "react";

import { ICartItems } from "../../../types/interfaces";
import { useDispatch } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Grid from "@material-ui/core/Grid/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Icon from "@material-ui/core/Icon/Icon";/*Works with a CDN fount at Material-UI.com*/

import Aos from "aos";

import { addQuantityToItem, clearIDFromCart, removeAllQuantityFromItem, removeQuantityFromItem } from "../../../store/actions";

import { fixedTitleLength } from "../../../utils/Parse";

/**
 * @typedef {Object} ICartCardProps
 * @property {function} getQtyTotal - Update quantity total with each
 */
interface ICartCardProps {
  getQtyTotal: () => void;
  // onAddQuantityToItem: ({props, quantity}: any) => void
  addQuantityToItem?: ({ props, quantity }: any) => void;
}

type IProps = ICartCardProps & ICartItems;

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
  cartCardContainer: {
    border: "0.5px solid lightGray",
    borderRadius: "4px",
    boxShadow: "0px 0px 8px 10px #efefef99",
    height: "130px",
    position: "relative",
    maxWidth: "600px",
    margin: "10px auto 25px",
    backgroundColor: "white",
    [theme.breakpoints.up("md")]: {
      maxWidth: "750px",
    },
  },
  cartItemImgContainer: {
    height: "100%",
  },
  cartItemImg: {
    width: "50px",
    [theme.breakpoints.up("lg")]: {
      width: "70px",
    },
  },
  cartItemBtn: {
    margin: "0px 2px",
    boxShadow: "0px 0px 8px rgba(0,0,0,0.05)",
    color: `${theme.palette.common.slateTan}`,
    minWidth: '50px',
    [theme.breakpoints.up("xs")]: {
      width: "62px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "65px",
    },
    

  },
  currentQty: {
    color: `${theme.palette.common.dimGray}`,
    letterSpacing: "0.5px",
    fontSize: "0.75rem",
    fontFamily: "Roboto",
    lineHeight: 1.55,
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.85rem",
    },
  },
  deleteCard: {
    position: "absolute",
    color: "lightGray",
    top: "3px",
    right: "4px",
    transition: "color 0.3s",
    "&:hover": {
      cursor: "pointer",
      color: theme.palette.common.dimegray,
    },
  },
}));

export default function Item(props: IProps) {
  const classes = useStyles();
  const [mounted, setMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  /** Takes an action to add or remove. It dertermines if it should dispatch add one, remove one, or clear item completely.
   *  Inside of case "remove quantity" it determines if it should remove an item by 1 or clear the item from the cart list
   * @param editAction
   */
  const editQuantity = (editAction: string): void => {
    switch (editAction) {
      case "add quantity": {
        dispatch(addQuantityToItem({ ...props, quantity: 1 }));
        // props.onAddQuantityToItem({ ...props, quantity: 1 });
        props.getQtyTotal();
        return;
      }
      case "remove quantity": {
        if (props.quantity === 1) {
          dispatch(removeQuantityFromItem({ ...props, quantity: 1 }));
          props.getQtyTotal();
          dispatch(clearIDFromCart({ ...props }));
        } else dispatch(removeQuantityFromItem({ ...props, quantity: 1 }));
        props.getQtyTotal(); /* Update numberofItems in cart after every editQuantity Call*/
        return;
      }
    }
  };

  const clearCard = () => {
    dispatch(removeAllQuantityFromItem({ ...props }));
    dispatch(clearIDFromCart({ ...props }));
    props.getQtyTotal();
  };

  useEffect(() => {
    Aos.init({ duration: 900 });
  }, []);

  const setProgress = () => setTimeout(() => setLoading(false), 500);

  setTimeout(() => setMounted(true), 1000);

  return (
    <Grid
      data-aos={mounted === false ? "fade-up" : "none"}
      container
      direction="row"
      className={classes.cartCardContainer}
    >
      <Grid item xs={2} md={3}>
        <Grid
          container
          className={classes.cartItemImgContainer}
          justify="center"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <img
              className={classes.cartItemImg}
              src={props.src}
              alt="Items in card"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} md={8}>
        <Grid
          container
          direction="row"
          alignContent="center"
          justify="space-around"
          style={{ height: "100%" }}
        >
          {/* Name of Item
               i.e. props.name from global state (redux) */}
          <Grid item>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Nunito",
                letterSpacing: "0.5px",
              }}
              variant="body2"
            >
              {fixedTitleLength(props.name, 15)}
              <br />
              <span
                style={{
                  color: "#afafaf",
                  fontSize: "0.68rem",
                  letterSpacing: "0.5px",
                  display: "inline",
                  marginLeft: "4px",
                }}
              >
                {"Size " + props.size + '"'}
              </span>
            </Typography>

            <Typography variant="body2">{'$' + props.price}</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              justify="space-between"
              alignContent="center"
              style={{ height: "100%" }}
            >
              <Button
                className={classes.cartItemBtn}
                variant="outlined"
                color="primary"
                disabled={loading ? true : false}
                data-testid="add-qty-btn"
                onClick={() => {
                  editQuantity("add quantity");
                  setLoading(true);
                  setProgress();
                }}
              >
                <Icon>add</Icon>
              </Button>

              <Button
                className={classes.cartItemBtn}
                variant="outlined"
                color="primary"
                disabled={loading ? true : false}
                data-testid="remove-qty-btn"
                onClick={() => {
                  editQuantity("remove quantity");
                  setLoading(true);
                  setProgress();
                }}
              >
                <Icon>remove</Icon>
                {/* If loading is true start the circual progress component */}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <div className={classes.currentQty}>
              <strong>Qty</strong> <br />

                {/* <span data-testid="item-qty">{props.quantity}</span> */}
                {loading === true ? (
                  <>
                    <CircularProgress size={8} />
                    <span
                      data-testid="item-qty"
                      style={{ position: "absolute", visibility: "hidden" }}
                    >
                      {props.quantity}
                    </span>
                  </>
                ) : (
                  <span data-testid="item-qty">{props.quantity}</span>
                )}
            </div>
          </Grid>
        </Grid>
      </Grid>
      <Icon
        className={classes.deleteCard}
        onClick={() => {
          clearCard();
        }}
      >
        close
      </Icon>
    </Grid>
  );
}
