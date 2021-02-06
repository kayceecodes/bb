import { useRouter } from "next/router";
import React, { CSSProperties, useEffect, useState } from "react";

import {
  IBraceletData,
  IPageAnimations,
  IMotions,
  ICartItems,
} from "../../src/types/interfaces";

import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Grid from "@material-ui/core/Grid/Grid";
import Icon from "@material-ui/core/Icon/Icon";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

import { motion } from "framer-motion";

import { connect, useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addToCart, addQuantityToItem } from "../../src/store/actions";

import theme from "../../src/ui/Theme";

import CartSummaryModal from "../../src/ui/cartSummaryModal/CartSummaryModal";
import { bracelets } from "../../src/data/data";

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

//Create an intersection instead of a type that takes only one interface at a time.
//Intersections truly combines types for a component
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
  arrow: {
    fontSize: "1.6rem",
  },
  headersUnderline: {
    padding: "0px 13px 10px",
    borderBottom: `3px solid ${theme.palette.common.antiqueWhite}`,
  },
  boxShadows: {
    boxShadow: "0px 0px 8px 10px #efefef50",
  },
  itemImg: {
    width: "160px",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 85,
    [theme.breakpoints.up("sm")]: {
      width: 100,
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  quantityControl: {
    marginTop: "15px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  addShoppingcartBtn: {
    marginTop: "5px",
    padding: "7px 12px",
  },
  goToCartBtn: {
    marginTop: "5px",
    fontSize: "0.6rem",
    textTransform: "none",
    color: theme.palette.common.slateTan,
  },
  itemDetailsOptions: {
    // height: '320px',
  },
  itemName: {
    width: "100%",
    marginTop: "8px",
    [theme.breakpoints.up("sm")]: {
      marginTop: "6px",
    },
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
export function convertItemName(itemName: string) {
  /* Find spaces */
  let spaces = new RegExp("[ ]+", "g");
  /* Then replace with empty string */
  let namedRoute = itemName.replace(spaces, "");

  let uppercase = new RegExp("[A-Z]", "g");
  return namedRoute.replace(uppercase, (x: string) => x.toLowerCase());
}

function DisplayItem(props: IProps) {
  const classes = useStyles();
  const dispatch: Dispatch<any> = useDispatch();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [currentItem, setCurrentItem] = useState<IBraceletData>({
    name: "Empty Name",
    price: 0,
    category: "Empty Category",
    src: "Empty Src",
  });
  const router = useRouter();
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  }; // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState<ICartItems>({
    name: 'Not Available',
    size: 0,
    quantity: 1,
    price: 0.0,
    src: "Not Available",
    id: "",
  });

  /**
   *  Identifies an item by name
   *  Uses an already imported data.
   *  Compares it to a path from it param.
   * @params {nameOfBracelet} string - this will take a name from asPath of router object
   * @return {void}
   */
  const findItem = (path: string) => {
    const prefix = "/collections/";

    const foundItem = bracelets.find((item) => {
      if (prefix + convertItemName(item.name) === path) {
        console.log(
          "Prefixes and name",
          prefix + " " + path + " " + convertItemName(item.name)
        );
        setCurrentItem(item);
        setValues({
          name: item.name,
          size: 0,
          quantity: 1,
          price: item.price,
          src: item.src,
          id: "",
        })
      }
    });
    console.log("Found Bracelet ", foundItem);
  };

  const goBackHandle = () => {
    router.push("/collections");
  };

  const handleChange = (prop: keyof ICartItems, event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /**
   * Map through ids in CartItems then checks if it includes the called id
   * @param newItem
   * @returns {void}
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
      name: currentItem.name,
      size: 0,
      quantity: 1,
      price: currentItem.price,
      src: currentItem.src,
      id: "",
    });

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
    setTimeout(() => setLoading(false), 500);
    setTimeout(() => setOpen(true), 500);
  };

  useEffect(() => {
    if (values.name == 'Not Available') {
      findItem(router.asPath);
    }
    props.setValue(1);
  });

  return (
    <>
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
              <Grid
                container
                direction="row"
                spacing={matches.sm ? 8 : 3}
                justify="space-between"
              >
                <Grid item xs={1} sm={1}>
                  {/*Left Side of container - the Back Arrow */}
                  <Typography variant="caption">
                    <Button onClick={() => goBackHandle()}>
                      <Icon className={classes.arrow}>arrow_back_ios</Icon>
                    </Button>
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={9}>
                  {/* Right Side of Cantainer - The Item's Name */}
                  <Typography variant="h3" className={classes.itemName}>
                    <div className={classes.headersUnderline}>
                      {values.name}
                    </div>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.sectionMargin} />
            {/*Separate Name from item's img and details*/}
            <Grid item>
              {/* Second Item in the main container of Displayitem component - img left & details/options right */}
              <Grid container direction="row" alignItems="center">
                <Grid item sm={6}>
                  {/* LEFT SIDE OF ITEM - Img Of Bracelet */}
                  <img
                    src={values.src}
                    // src={currentItem.src}
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
                    className={classes.itemDetailsOptions}
                  >
                    <Grid item>
                      <div className={classes.sectionMargin} />
                    </Grid>

                    {/* SIZE - CHOOSE SIZE*/}
                    <Grid item>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Size
                        </InputLabel>
                        <Select
                          data-testid="size-select-btn"
                          labelId="size-label-id"
                          id="size"
                          value={values.size}
                          onChange={(event: any) => handleChange("size", event)}
                          label="Size"
                          className={
                            classes.outlined + " " + classes.boxShadows
                          }
                        >
                          <MenuItem value={0}>Inches</MenuItem>
                          <MenuItem data-testid="menuItem" value={4.5}>
                            4.5"
                          </MenuItem>
                          <MenuItem value={5}>5"</MenuItem>
                          <MenuItem value={5.5}>5.5"</MenuItem>
                          <MenuItem value={6}>6"</MenuItem>
                          <MenuItem value={6.5}>6.5"</MenuItem>
                          <MenuItem value={7}>7"</MenuItem>
                          <MenuItem value={7.5}>7.5"</MenuItem>
                          <MenuItem value={8}>8"</MenuItem>
                          <MenuItem value={8.5}>8.5"</MenuItem>
                          <MenuItem value={9}>9"</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      {/* QUANTITY - INPUT */}
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <InputLabel id="demo-simple-select-outlined-label">
                          Qty
                        </InputLabel>
                        <Select
                          data-testid="quantity-select-btn"
                          labelId="quantity-label-id"
                          value={values.quantity}
                          onChange={(
                            event: React.ChangeEvent<{ value: unknown }>
                          ) => handleChange("quantity", event)}
                          label="Qty"
                          className={
                            classes.outlined + " " + classes.boxShadows
                          }
                        >
                          <MenuItem value={0}>0 - 10</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
                          <MenuItem value={6}>6</MenuItem>
                          <MenuItem value={7}>7</MenuItem>
                          <MenuItem value={8}>8</MenuItem>
                          <MenuItem value={9}>9</MenuItem>
                          <MenuItem value={10}>10</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* SHOPPING CART - BTN - ADD TO CART FUNCTION
                      ADDS CART ITEMS TO REDUCER
                  */}

                    <Grid item>
                      <Button
                        className={classes.addShoppingcartBtn}
                        variant="outlined"
                        color="primary"
                        data-testid="add-to-cart"
                        disabled={
                          values.size === 0 || values.quantity === 0
                            ? true
                            : false
                        }
                        onClick={(e: any) => {
                          onAddToCart(values);
                          setLoading(true);
                          handleClick(e);
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} />
                        ) : (
                          <Icon>add_shopping_cart</Icon>
                        )}
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        className={classes.goToCartBtn}
                        onClick={() => {
                          router.push("/shoppingcart");
                          props.setValue(3);
                        }}
                      >
                        Go to <Icon>shopping_cart</Icon>
                      </Button>
                    </Grid>
                    {/* PRICE - CALCULATED */}
                    <Grid item style={{ paddingTop: "10px" }}>
                      <Typography variant="body1">
                        Price:{" "}
                        <span data-testid="price">
                          {/* ${(currentItem.price * values.quantity).toFixed(2)} */}
                          ${(values.price * values.quantity).toFixed(2)}
                        </span>
                      </Typography>
                    </Grid>
                    <div className={classes.sectionMargin} />
                    <Grid item>
                      <Typography variant="h5">
                        {currentItem.category}
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
            <div className={classes.sectionMargin} />
            <div className={classes.sectionMargin} />
            <div className={classes.sectionMargin} />
            <div className={classes.sectionMargin} />
          </Grid>
        </motion.div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  cartItems: state.cart.cartItems,
});

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     onAddToCart: (newItem: ICartItems) => dispatch(addToCart(newItem))
//   }
// }

export default connect(mapStateToProps)(DisplayItem);
